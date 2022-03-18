import { Product } from '../../../db/models'
import { checkUserRole } from '../../../lib/api-util';

const productQueries = {
  products: async (parent, { params }, context) => {
    try {
      const { pageSize, page } = params;
      
      return {
        results: async () => {
          const products = await Product.find()
            .skip(pageSize * (page - 1))
            .limit(pageSize);
          
          return products;
        },
        info: async () => {
          const count = await Product.countDocuments();
          const pages = Math.ceil(count / pageSize);
          const prev = page > 1 ? page - 1 : null;
          const next = page < pages ? page + 1 : null;

          return {
            count,
            pages,
            prev,
            next
          }
        }
      }
    } catch (error) {
      return error
    }
  },
  product: async (parent, { id }, context) => {
    try {
      return await Product.findById(id)
    } catch (error) {
      return error
    }
  },
  userProducts: async (parent, args, { user }) => {
    checkUserRole(user, ["ADMIN", "USER"]);
    try {
      return await Product.find({ user: user._id })
    } catch (error) {
      return error
    }
  },
  userWatchlist: async (parent, args, { user }) => {
    checkUserRole(user, ["ADMIN", "USER"]);
    try {
      return await Product.find({ watchedBy: user._id })
    } catch (error) {
      return error
    }
  }
};

export default productQueries;