import { Product, User } from '../../../db/models';

const orderFields = {
  Order: {
    user: async (order) => {
      const user = await User.findById(order.user);

      return user;
    },
    orderItems: async (order) => {
      const products = await order.orderItems.map((async (item) => {
        await Product.findById(item._id);
      }))
      
      return products;
    }
  }
}

export default orderFields;