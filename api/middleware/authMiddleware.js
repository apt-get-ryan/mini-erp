import jwt from 'jsonwebtoken';
import { User } from "../models/models.js";
import { getTokenData } from '../utils/jwt.js';

const JWT_KEY = process.env.JWT_KEY;

async function verifyToken(req, res, next) {
  const token = req.cookies?.token;
  if(!token) {
    res.status(401).json({error: "Acesso negado. Autenticação necessária|"});
    return;
  }
  try {
    const decoded = getTokenData(token);
    
    const user = await User.findByPk(decoded.userId, { attributes: ["id", "token_version"]});
    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    if (user.token_version !== decoded.tokenVersion) {
      return res.status(401).json({ error: "Token inválido" });
    }
    req.user = {
      id: decoded.userId,
      permissions: decoded.userPermissions,
      tokenVersion: decoded.tokenVersion
    };
    next();
  } catch (error) {
      res.status(401).json({error: "Token inválido."});
  }
  
}

export default verifyToken;