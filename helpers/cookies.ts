import Cookies from 'cookies'
import { NextApiResponse } from 'next'
import { NextApiRequestWithFilePayload } from '../pages/api/graphql'
import { parse } from 'path'


const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: 'strict',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week 
    }

export const setCookies = (
  req: NextApiRequestWithFilePayload,
  res: NextApiResponse,
  tokenArray: {name: string, value: any}[],
  options = cookieOptions
) => {
  const cookies = new Cookies(req, res)
  tokenArray.forEach(token => {
    const stringValue = typeof token.value === 'object' ? 'j:' + JSON.stringify(token.value) : String(token.value)
    cookies.set(token.name, stringValue, options);
  });
}

export const removeCookie = (
  req: NextApiRequestWithFilePayload,
  res: NextApiResponse,
  name: string = 'token',
) => {
  const cookies = new Cookies(req, res);
  cookies.set(name);
};

export const parseCookie = (req: NextApiRequestWithFilePayload) => {
  if (req.cookies) return req.cookies;

  const cookie = req.headers.cookie;
  return parse(cookie || '');
};

export const getCookie = (req: NextApiRequestWithFilePayload, name: string) => {
  const cookies = parseCookie(req);
  return cookies[name];
}