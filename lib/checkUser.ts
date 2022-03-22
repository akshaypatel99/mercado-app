import { GetServerSidePropsContext } from 'next';
import {validateRefreshToken} from './api-util';
import { ApolloError } from 'apollo-server-micro';

export interface MyPageContext extends GetServerSidePropsContext {
  user: any | null;
  error: Error | ApolloError | null;
}

type Enum = 'ADMIN' | 'USER';

const checkUser = async (context: MyPageContext, { level, redirect, message }: { level: Enum, redirect: boolean, message?: string }) => {
  const Cookie = context.req.headers.cookie;

  const isRefreshToken = Cookie.includes('refresh=');

  if (!isRefreshToken && redirect) {
    context.user = null;
    context.res.writeHead(302, {
			Location: message ? `/login?message=${message}&Crd` : '/login',
		});
    context.res.end();
    return context;
  }
  
  if (!isRefreshToken) {
    context.user = null;
    return context;
  }

  if (isRefreshToken) {
    const refreshToken = Cookie.substring(Cookie.indexOf('refresh=') + 8);
    const decodedRefreshToken = validateRefreshToken(refreshToken);

    if (!decodedRefreshToken) {
      context.user = null;
      context.res.writeHead(302, {
        Location: message ? `/login?message=${message}&dRT` : '/login',
      });
      context.res.end();
      return context;
    } else if (level === 'ADMIN' && decodedRefreshToken.role !== 'ADMIN') {
      context.user = null;
      context.res.writeHead(302, {
        Location: message ? `/login?message=Unauthorized access` : '/login',
      });
      context.res.end();
      return context;
    } else {
      context.user = decodedRefreshToken;
      return context;
    }
  }

  return context;
}

export default checkUser;