import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
// import { jwtAccessSecret, jwtRefreshSecret, frontendDevURL, frontendProdURL } from '../config/environment';
import cloudinary from 'cloudinary';
import { AuthenticationError } from 'apollo-server-micro';

export type UserInfo = {
  _id: String
}

export type UserData = {
  _id: String;
  name: string;
  email: string;
  password: string;
  role: string;
}

const jwtAccessSecret = process.env.JWT_ACCESS_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
const jwtSecret = process.env.JWT_SECRET;

/* AUTH TOKEN HELPERS */
const setTokens = (user) => {
  // Sign the JWT
  const accessUser: UserInfo = {
    _id: user._id,
  }
  const accessToken = jwt.sign(
    {
      user: accessUser
    },
    jwtAccessSecret,
    { algorithm: 'HS256', expiresIn: '1h' }
  )

  const refreshUser: UserInfo = {
    _id: user._id,
  }
  const refreshToken = jwt.sign(
    {
      user: refreshUser
    },
    jwtRefreshSecret,
    { algorithm: 'HS256', expiresIn: '7d' }
  )
  
  return { accessToken, refreshToken };
};

const setToken = (user) => {
  const token = jwt.sign(
    {
      user: user._id
    },
    jwtSecret,
    { algorithm: 'HS256', expiresIn: '1d' }
  );
  return token;
}

const validateAccessToken = (token: string) => {
  try {
    return jwt.verify(token, jwtAccessSecret);
  } catch (error) {
    return null;
  }
};

const validateRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, jwtRefreshSecret);
  } catch (error) { 
    return null;
  }
};

const validateToken = (token: string) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    return null;
  }
};

/* PASSWORD HELPERS */
const hashPassword = async (password: string) => {
  return await new Promise((resolve, reject) => {
    // Generate a salt at level 12 strength
     bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

const verifyPassword = (
  passwordAttempt,
  hashedPassword
) => {
  return bcrypt.compare(passwordAttempt, hashedPassword);
};

/* UPLOAD HELPERS */
const uploadFile = async (file) => {
  const { createReadStream } = await file;
  const fileStream = createReadStream();

  // Initialize cloudinary
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  // Return Cloudinary object
  return new Promise<any>((resolve, reject) => {
    const cloudStream = cloudinary.v2.uploader.upload_stream(function (err, result) {
      if (err) {
        console.log('util', err);
        reject(err);
      }
      console.log('util', result);
      resolve(result);
    });

    fileStream.pipe(cloudStream);
  });
};


/* AUTHENTICATION HELPERS */
const checkUserRole = (user: UserData, allowableRoles: string[]) => {
	if (!user || !allowableRoles.includes(user.role)) {
		throw new AuthenticationError('Not authorized');
	}
	return true;
};


export {
  setTokens,
  setToken,
  validateAccessToken,
  validateRefreshToken,
  validateToken,
  hashPassword,
  verifyPassword,
  uploadFile,
  checkUserRole
};
