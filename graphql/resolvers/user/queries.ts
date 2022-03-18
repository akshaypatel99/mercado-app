import { AuthenticationError } from "apollo-server-micro";
import { User } from "../../../db/models";
import { checkUserRole, safeUserInfo } from "../../../lib/api-util";

const userQueries = {
  users: async (parent, { params }, { user }) => {
    checkUserRole(user, ["ADMIN"]);
    try {
      const { pageSize, page } = params;

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
  user: async (parent, { id }, { user }) => {
    checkUserRole(user, ["ADMIN"]);
    try {
      return await User.findById(id)
    } catch (error) {
      return error
    }
  },
  currentUser: async (parent, args, { user }) => {
    try {
      if (!user) {
        throw new AuthenticationError("Not logged in");
      }
      const data = await User.findById(user._id)
      const currentUserData = safeUserInfo(data);
      return currentUserData;
    } catch (error) {
      return error
    }
  },
  loggedIn: async (parent, args, { user }) => {
    try {
      return !!user;
    } catch (error) {
      return error
    }
  }
};

export default userQueries;