import { gql } from '@apollo/client';
import { GetServerSidePropsContext } from 'next';
import client from './apollo-client';
import {validateRefreshToken} from './api-util';

export interface MyPageContext extends GetServerSidePropsContext {
  user: any | null;
  error: Error | null;
}

type Enum = 'ADMIN' | 'USER';

const checkUser = async (context: MyPageContext, { level, redirect, message }: { level: Enum, redirect: boolean, message?: string }) => {
  const Cookie = context.req.headers.cookie;

  const isRefreshToken = Cookie.includes('refreshToken=');

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