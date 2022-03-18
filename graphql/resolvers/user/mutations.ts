import { ApolloError, UserInputError } from 'apollo-server-micro';
import { User, Product } from '../../../db/models';
import { removeCookie, setCookies } from '../../../lib/cookies';
import { hashPassword, verifyPassword, checkUserRole, setTokens, safeUserInfo } from '../../../lib/api-util';

const userMutations = {
  signup: async (parent, { input }, { req, res }) => {
    try {
      const { name, email, password } = input;

      const hashedPassword = await hashPassword(password);

      if (hashedPassword instanceof Error) {
        throw new ApolloError('There was a problem creating your account, please try again')
      } else if (typeof hashedPassword === 'string') {

        const userData = {
          name,
          email,
          password: hashedPassword,
          role: 'USER'
        }

        const existingEmail = await User.findOne({ email: userData.email }).lean();

        if (existingEmail) {
          throw new ApolloError('Email already exists');
        }

        const newUser = new User(userData);
        const savedUser = await newUser.save();

        if (savedUser) {
          const {accessToken, refreshToken} = setTokens(savedUser);
          const tokenArray = [{name: 'access', value: accessToken}, {name: 'refresh', value: refreshToken}];
          setCookies(req, res, tokenArray);

          const savedUserData = safeUserInfo(savedUser);

          return {
            message: 'User created!',
            user: savedUserData
          };
        } else {
          throw new ApolloError('There was a problem creating your account')
        }
      }
    } catch (error) {
      return error
    }
  },
  login: async (parent, { input }, { req, res }) => {
    try {
      const { email, password } = input;

      const foundUser = await User.findOne({ email }).lean();

      if (!foundUser) {
        throw new UserInputError('Wrong email or password');
      }

      const passwordValid = await verifyPassword(password, foundUser.password);
      
      if (passwordValid) {
        const { accessToken, refreshToken } = setTokens(foundUser);
        const tokenArray = [{name: 'access', value: accessToken}, {name: 'refresh', value: refreshToken}];
        setCookies(req, res, tokenArray);

        const foundUserData = safeUserInfo(foundUser);

        return {
          message: 'Authentication successful',
          user: foundUserData
        }
      } else {
        throw new UserInputError('Wrong email or password');
      }
    } catch (error) {
      return error
    }
  },
  logout: async (parent, args, { req, res }) => {
    try {
      removeCookie(req, res, 'access');
      removeCookie(req, res, 'refresh');

      return true;
    } catch (error) {
      return error
    }
  },
  updateUserRole: async (parent, { id, role }, { user }) => {
    checkUserRole(user, ["ADMIN"]);
    try {
      const allowedRoles = ['USER', 'ADMIN'];

      if (!allowedRoles.includes(role)) {
        throw new ApolloError('Invalid user role')
      }
      const updatedUser = await User.findOneAndUpdate(
        { _id: id }, { role }
      );
      return {
        message: 'User role updated. User must log in again for the changes to take effect.',
        user: updatedUser,
      }
    } catch (error) {
      return error;
    }
  },
  deleteUser: async (parent, { id }, { user }) => {
    checkUserRole(user, ["ADMIN"]);
    try {
      const deletedUser = await User.findOneAndDelete({ _id: id });

      return {
        message: 'User deleted!',
        user: deletedUser
      }
  
    } catch (error) {
      return error;
    }
  },
  toggleWatchlist: async (parent, { id }, { user }) => {
    checkUserRole(user, ["ADMIN", "USER"]);
    try {
      const foundUser = await User.findById(user._id);
      const foundProduct = await Product.findById(id);
      
      if (!foundUser) {
        throw new ApolloError('User not found');
      };
      if (!foundProduct) {
        throw new ApolloError('Product not found');
      }

      // If product is already in watchlist, remove it
      if (foundUser.userWatchlist.includes(id)) {
        await foundUser.updateOne({ $pull: { userWatchlist: id } });
        await foundUser.save();
        
        await foundProduct.updateOne({ $pull: { watchedBy: user._id } });
        await foundProduct.save();

        return {
          message: 'Product removed from watchlist',
          user: foundUser,
        }
      } else {
        // Add product to watchlist
        await foundUser.updateOne({ $addToSet: { userWatchlist: id } });
        await foundUser.save();
        
        await foundProduct.updateOne({ $addToSet: { watchedBy: user._id } });
        await foundProduct.save();
        
        return {
          message: 'Product added to watchlist',
          user: foundUser,
        }
      }
    } catch (error) {
      return error;
    }
  }
}

export default userMutations;