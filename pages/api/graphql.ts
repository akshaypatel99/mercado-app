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

type NextApiRequestWithFilePayload = NextApiRequest & {
  filePayload: any
}

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
  context: async ({ req, res }: { req: NextApiRequestWithFilePayload, res: NextApiResponse }) => {
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

export default cors(async (req: NextApiRequestWithFilePayload, res: NextApiResponse) => {
  if (req.method === 'OPTIONS') {
    return res.end();
  };

  const contentType = req.headers["content-type"]
  if (contentType && contentType.startsWith("multipart/form-data")) {
    req.filePayload = await processRequest(req, res)
  }

  await startServer;
  return apolloServer.createHandler({ path: "/api/graphql" })(req, res)
})

  
export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
}

