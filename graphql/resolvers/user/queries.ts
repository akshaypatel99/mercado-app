import { User } from "../../../db/models";

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
};

export default userQueries;