import { ApolloServer } from 'apollo-server-micro';
import { PageConfig } from 'next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from '../../graphql/typedefs';
import resolvers from '../../graphql/resolvers';
import connectDB from '../../db/config';
import Cors from 'micro-cors';
import validateTokensMiddleware from '../../helpers/validateTokens';
import { NextApiRequest , NextApiResponse } from 'next';
import { getCookie } from '../../helpers/cookies';
import { validateToken } from '../../helpers/util';

const cors = Cors({
  origin: "https://studio.apollographql.com",
  allowCredentials: true,
})

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

export default cors(async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  // await validateTokensMiddleware(req, res);
  
  await connectDB();
  await apolloServer.start();

  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
})

  
export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
}