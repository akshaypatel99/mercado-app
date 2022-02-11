import { ApolloError } from "apollo-server-micro";
import { User, Order } from "../../../db/models";

const orderQueries = {
  orders: async (parent, args, context) => {
    try {
      const { pageSize, page } = args.params;

      return {
        results: async () => {
          const orders = await Order.find()
            .skip(pageSize * (page - 1))
            .limit(pageSize);
          
          return orders;
        },
        info: async () => {
          const count = await Order.countDocuments();
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
  order: async (parent, args, { user }) => {
    try {
      const { id } = args;

      const loggedInUser = await User.findById({ _id: user._id });
      
      if (loggedInUser.userOrders.includes({ order: id }) || loggedInUser.role === 'ADMIN') {
        return await Order.findById(id)
      } else {
        throw new ApolloError('Unauthorized access')
      }
    } catch (error) {
      return error
    }
  },
  userOrders: async (parent, args, { user }) => {
    try {
      return await Order.find({ user: user._id })
    } catch (error) {
      return error
    }
  }
};

export default orderQueries;