import { ApolloServer } from 'apollo-server-micro';
import { PageConfig } from 'next';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from '../../graphql/typedefs';
import resolvers from '../../graphql/resolvers';
import connectDB from '../../db/config';
import Cors from 'micro-cors';

connectDB();

const cors = Cors()

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});


const apolloServer = new ApolloServer({
  schema,

  context: ({ req, res }) => ({ req, res }),
});

const startServer = apolloServer.start();

export default cors(async function (req, res) { 
  await startServer;

  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
})

  
export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
}