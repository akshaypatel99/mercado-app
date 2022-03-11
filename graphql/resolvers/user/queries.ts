import { User, Product } from "../../../db/models";
import { safeUserInfo } from "../../../lib/api-util";

const userQueries = {
  users: async (parent, args, context) => {
    try {
      const { pageSize, page } = args.params;

      return {
        results: async () => {
          const users = await User.find()
            .skip(pageSize * (page - 1))
            .limit(pageSize);
          
          return users;
        },
        info: async () => {
          const count = await User.countDocuments();
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
  user: async (parent, args, context) => {
    try {
      const { id } = args;
      return await User.findById(id)
    } catch (error) {
      return error
    }
  },
  currentUser: async (parent, args, { user }) => {
    try {
      const data = await User.findById(user._id)
      const currentUserData = safeUserInfo(data);
      return currentUserData;
    } catch (error) {
      return error
    }
  }
};

export default userQueries;