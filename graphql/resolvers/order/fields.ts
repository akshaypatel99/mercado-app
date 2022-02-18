import { Product, User } from '../../../db/models';

const orderFields = {
  Order: {
    user: async (order) => {
      const user = await User.findById(order.user);

      return user;
    },
    product: async (order) => {
      const product = await Product.findById(order.product);
      
      return product;
    }
  }
}

export default orderFields;