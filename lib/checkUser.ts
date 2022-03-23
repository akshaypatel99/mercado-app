import { GetServerSidePropsContext } from 'next';
import {validateRefreshToken} from './apiUtils';

type Enum = 'ADMIN' | 'USER';

const checkUser = async (context: GetServerSidePropsContext, { level, redirect, message }: { level: Enum, redirect: boolean, message?: string }) => {
  const Cookie = context.req.headers.cookie;

  if (!Cookie && redirect) {
    context.res.writeHead(302, {
      Location: message ? `/login?message=${message}` : '/login',
    });
    context.res.end();
    return {
      user: null,
    };
  }

  if (!Cookie) {
    return {
      user: null,
    };
  }

  const isRefreshToken = Cookie.includes('refresh=');

  if (!isRefreshToken && redirect) {
    context.res.writeHead(302, {
			Location: message ? `/login?message=${message}` : '/login',
		});
    context.res.end();
    return {
      user: null,
    };
  }
  
  if (!isRefreshToken) {
    return {
      user: null,
    };
  }

  if (isRefreshToken) {
    const refreshToken = Cookie.substring(Cookie.indexOf('refresh=') + 8);
    const decodedRefreshToken = validateRefreshToken(refreshToken);

    if (!decodedRefreshToken) {
      context.res.writeHead(302, {
        Location: message ? `/login?message=${message}` : '/login',
      });
      context.res.end();
      return {
        user: null,
      }
    } else if (level === 'ADMIN' && decodedRefreshToken.role !== 'ADMIN') {
      context.res.writeHead(302, {
        Location: message ? `/login?message=Unauthorized access` : '/login',
      });
      context.res.end();
      return {
        user: null,
      };
    } else {
      return {
        user: decodedRefreshToken,
      };
    }
  }

  return {

    user: null,
  };
}

export default checkUser;