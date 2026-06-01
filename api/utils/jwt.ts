import {jwtVerify, JWTPayload} from 'jose';
import { env } from './env.ts';
const secret = new TextEncoder().encode(env.JWT_KEY);

export interface TokenPayload extends JWTPayload {
  userId: number,
  userPermissions: string[],
  tokenVersion: number

}

async function verifyToken(token): Promise<TokenPayload> {
  const {payload} = await jwtVerify(token, secret);
  return payload as TokenPayload;
}
async function getTokenData(token) {
  try {
    const decoded = await verifyToken(token);
    return decoded;
  } catch (error) {
    throw new Error("Failed to verify token.");
  }
}


export {
  verifyToken,
  getTokenData
}