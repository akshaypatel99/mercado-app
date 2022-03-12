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

  if (!Cookie && redirect) {
    context.user = null;
    context.res.writeHead(302, {
			Location: message ? `/login?message=${message}` : '/login',
		});
    context.res.end();
    return;
  }
  
  if (!Cookie) {
    context.user = null;
    return;
  }

  const refreshToken = Cookie.substring(Cookie.indexOf('refresh=') + 8);
  const decodedRefreshToken = validateRefreshToken(refreshToken);

  if (!decodedRefreshToken) {
    context.user = null;
    context.res.writeHead(302, {
      Location: message ? `/login?message=${message}` : '/login',
    });
    context.res.end();
    return;
  } else if (level === 'ADMIN' && decodedRefreshToken.role !== 'ADMIN') {
    context.user = null;
    context.res.writeHead(302, {
      Location: message ? `/login?message=Unauthorized access` : '/login',
    });
    context.res.end();
    return;
  } else {
    context.user = decodedRefreshToken;
  }

  return context;
}

export default checkUser;