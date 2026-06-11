import { User } from "../models/models.js";
import { getTokenData } from '../utils/jwt.ts';
import { env } from '@/utils/env.ts';

const JWT_KEY = env.JWT_KEY;


async function verifyToken(req, res, next) {
  const token = req.cookies?.token;
  if(!token) {
    res.status(401).json({error: "Acesso negado. Autenticação necessária|"});
    return;
  }
  try {
    const decoded = await getTokenData(token);
    const user = await User.findByPk(decoded.userId, { attributes: ["id", "token_version"]});
    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    if (user.token_version !== decoded.token_version) {
      return res.status(401).json({ error: "Token inválido" });
    }
    next();
  } catch (error) {
      console.log(error)
      res.status(401).json({error: "Token inválido."});
  }
  
}

export { verifyToken };