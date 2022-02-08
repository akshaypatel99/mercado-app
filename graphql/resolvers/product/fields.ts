import { User } from '../../../db/models';

const productFields = {
  Product: {
    user: async (product) => {
      const user = await User.findById(product.user);

      return user;
    }
  }
}

export default productFields;