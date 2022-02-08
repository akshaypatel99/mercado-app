import { Product, Order } from '../../../db/models';

const userFields = {
  User: {
    userProducts: async (user) => {
      const products = await Product.find({ user: user._id });

      return products;
    },
    userOrders: async (user) => {
      const orders = await Order.find({ user: user._id });

      return orders;
    }
  }
}

export default userFields;