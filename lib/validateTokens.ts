import { setTokens, UserData, validateAccessToken, validateRefreshToken } from "./apiUtils";
import { User } from "../db/models";
import { NextApiResponse } from 'next';
import { NextApiRequestWithFilePayload } from '../pages/api/graphql'
import { getCookie, removeCookie, setCookies } from "./cookies";

export default async function validateTokens(req: NextApiRequestWithFilePayload, res: NextApiResponse) {
  const accessToken: string = getCookie(req, 'access');
  const refreshToken: string = getCookie(req, 'refresh');

  if(!accessToken && !refreshToken) return { req, res, user: null };

  // If access token is valid, continue
  const decodedAccessToken = validateAccessToken(accessToken);
  
  if (decodedAccessToken) {
    return { req, res, user: decodedAccessToken };
  }

  // If access token is invalid, check refresh token
  const decodedRefreshToken = validateRefreshToken(refreshToken);

  if(decodedRefreshToken && decodedRefreshToken._id) {
    const user: UserData = await User.findById(decodedRefreshToken._id).lean();

    // If refresh token is invalid, clear cookies
    if (!user) {
      removeCookie(req, res, 'access');
      removeCookie(req, res, 'refresh');
      return { req, res, user: null };
    }

    // If refresh token is valid, set new tokens and continue
    const { accessToken, refreshToken } = setTokens(user);
    const decodedAccessToken = validateAccessToken(accessToken);
    // Update cookies with new tokens
    const tokenArray = [{name: 'access', value: accessToken}, {name: 'refresh', value: refreshToken}];
    setCookies(req, res, tokenArray);

    return { req, res, user: decodedAccessToken };
  }
}
