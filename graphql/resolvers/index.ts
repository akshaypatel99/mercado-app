import { userQueries, userMutations, userFields } from "./user";
import { productQueries, productMutations, productFields } from "./product";
import { orderQueries, orderMutations, orderFields } from "./order";
import GraphQLUpload from 'graphql-upload/public/GraphQLUpload'

const resolvers = {
  Query: {
    ...userQueries,
    ...productQueries,
    ...orderQueries
  },
  Upload: GraphQLUpload,
  Mutation: {
    ...userMutations,
    ...productMutations,
    ...orderMutations
  },
  ...userFields,
  ...productFields,
  ...orderFields
};

export default resolvers;