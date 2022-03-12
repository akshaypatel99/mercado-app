import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cloudinary from 'cloudinary';
import { AuthenticationError } from 'apollo-server-micro';

export type AccessUserInfo = {
  _id: string
  role: string
}

export type RefreshUserInfo = {
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
  userWatchList: object[];
  createdAt: string;
  updatedAt: string;
}

const jwtAccessSecret = process.env.JWT_ACCESS_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

/* AUTH TOKEN HELPERS */
const setTokens = (user) => {

  const accessUser: AccessUserInfo = {
    _id: user._id,
    role: user.role
  }

  const refreshUser: RefreshUserInfo = {
    _id: user._id,
    role: user.role
  }

  const accessToken = jwt.sign(accessUser, jwtAccessSecret, { algorithm: 'HS256', expiresIn: '1h' });

  const refreshToken = jwt.sign(refreshUser, jwtRefreshSecret, { algorithm: 'HS256', expiresIn: '7d' });

  return { accessToken, refreshToken };
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
        reject(err);
      }
      console.log('util', result);
      resolve(result);
    });

    fileStream.pipe(cloudStream);
  });
};


/* AUTHENTICATION HELPERS */
const checkUserRole = (user: AccessUserInfo, allowableRoles: string[]) => {
	if (!user || !allowableRoles.includes(user.role)) {
		throw new AuthenticationError('Not authorized');
	}
	return true;
};


// Send safe user info (remove password)
const safeUserInfo = (user: UserData) => {
  const { _id, name, email, role, userProducts, userOrders, userWatchList } = user;
  const userInfo = { _id, name, email, role, userProducts, userOrders, userWatchList };
  return userInfo;
}


export {
  setTokens,
  validateAccessToken,
  validateRefreshToken,
  hashPassword,
  verifyPassword,
  uploadFile,
  checkUserRole,
  safeUserInfo
};
