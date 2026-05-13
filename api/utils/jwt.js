import jwt from 'jsonwebtoken';

const JWT_KEY = process.env.JWT_KEY;


/** @returns {{userId: Number, userPermissions: Array<string>, tokenVersion: Number}} */
function verifyToken(token) {
  return jwt.verify(token, JWT_KEY);
}
function getTokenData(token) {
  try {
    const decoded = verifyToken(token);
    return decoded;
  } catch (error) {
    throw new Error("Failed to verify token.");
  }
}


export {
  verifyToken,
  getTokenData
}