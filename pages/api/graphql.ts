import { ApolloServer } from 'apollo-server-micro';
import { PageConfig } from 'next';
import { makeExecutableSchema } from '@graphql-tools/schema';
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
  if (req.method === 'OPTIONS') {
    return res.status(200).send('Ok!');
  }
  
  await startServer;

  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
})

  
export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
}