import { ApolloServer } from 'apollo-server-micro';
import { PageConfig } from 'next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from '../../graphql/typedefs';
import resolvers from '../../graphql/resolvers';
import connectDB from '../../db/config';
import Cors from 'micro-cors';
import { NextApiRequest , NextApiResponse } from 'next';
import { getCookie } from '../../helpers/cookies';
import { validateToken } from '../../helpers/util';

connectDB();

const cors = Cors()

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req, res }: { req: NextApiRequest, res: NextApiResponse }) => {
    try {      
      const token = getCookie(req);
      const decoded = validateToken(token);
      return { req, res, user: decoded };
    } catch (error) {
      return { req, res, user: null };
    }
  }
});

const startServer = apolloServer.start()

export default cors(async function (req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', 'https://studio.apollographql.com');
  res.setHeader('Access-Control-Allow-Origin', 'https://mercado-app.vercel.app/');
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  
  await startServer;

  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
})

  
export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
}