import { User, Order } from '../../../db/models';

const productFields = {
  Product: {
    user: async (product) => {
      const user = await User.findById(product.user);

      return user;
    },
    watchedBy: async (product) => {
      const users = await User.find({ userWatchList: product._id });

      return users;
    },
    orders: async (product) => {
      const orders = await Order.find({ product: product._id });

      return orders;
    }
  }
}

export default productFields;