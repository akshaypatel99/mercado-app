import { ApolloServer } from 'apollo-server-micro';
import { PageConfig } from 'next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from '../../graphql/typedefs';
import resolvers from '../../graphql/resolvers';
import connectDB from '../../db/config';
import Cors from 'micro-cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { processRequest } from 'graphql-upload';
import { getCookie } from '../../helpers/cookies';
import { validateToken } from '../../helpers/util';

connectDB();

const cors = Cors({
  allowCredentials: true,
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  origin: '*',
})

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const apolloServer = new ApolloServer({
  schema,
  introspection: true,
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
  // Preflight request
  if (req.method === 'OPTIONS') {
    return res.end();
  };
  
  // Check if the request is an image upload (multipart/form-data)
  const contentType = req.headers['content-type'];
  if (contentType && contentType.includes('multipart/form-data')) {
    req.body.filePayload = await processRequest(req);
  }

  await startServer;

  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
})

  
export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
}