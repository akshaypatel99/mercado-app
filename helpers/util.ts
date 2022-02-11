import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cloudinary from 'cloudinary';
import { AuthenticationError } from 'apollo-server-micro';

export type UserInfo = {
  _id: string
  role: string
}

export type UserData = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  userProducts: object[];
  userOrders: object[];
  createdAt: string;
  updatedAt: string;
}

const jwtSecret = process.env.JWT_SECRET;

/* AUTH TOKEN HELPERS */
const setToken = (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      role: user.role
    },
    jwtSecret,
    { algorithm: 'HS256', expiresIn: '1d' }
  );
  return token;
}

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
const checkUserRole = (user: UserInfo, allowableRoles: string[]) => {
	if (!user || !allowableRoles.includes(user.role)) {
		throw new AuthenticationError('Not authorized');
	}
	return true;
};


// Send safe user info (remove password)
const safeUserInfo = (user) => {
  const { _id, name, email, role, userProducts, userOrders } = user;
  const userInfo = { _id, name, email, role, userProducts, userOrders };
  return userInfo;
}


export {
  setToken,
  validateToken,
  hashPassword,
  verifyPassword,
  uploadFile,
  checkUserRole,
  safeUserInfo
};
