import { serialize, CookieSerializeOptions } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
import { parse } from 'path'


const cookieOptions: CookieSerializeOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week 
    }

export const setCookie = (
  res: NextApiResponse,
  name: string = 'qid',
  value: unknown,
  options: CookieSerializeOptions = cookieOptions
) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge)
    options.maxAge /= 1000
  }

  res.setHeader('Set-Cookie', serialize(name, stringValue, cookieOptions));
}

export const removeCookie = (
  res: NextApiResponse,
  name: string = 'qid',
) => {
  res.setHeader('Set-Cookie', serialize(name, '', {
    ...cookieOptions,
    maxAge: -1,
  }));
};

export const parseCookie = (req: NextApiRequest) => {
  if (req.cookies) return req.cookies;

  const cookie = req.headers.cookie;
  return parse(cookie || '');
};

export const getCookie = (req: NextApiRequest) => {
  const cookies = parseCookie(req);
  return cookies['qid'];
}