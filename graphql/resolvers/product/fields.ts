import { User } from '../../../db/models';

const productFields = {
  Product: {
    user: async (product) => {
      const user = await User.findById(product.user);

      return user;
    },
    watchedBy: async (product) => {
      const users = await User.find({ userWatchList: product._id });

      return users;
    }
  }
}

export default productFields;