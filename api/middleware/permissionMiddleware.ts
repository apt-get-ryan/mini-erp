import MeService from '@/services/rbac/MeService.js';
import { getTokenData } from '../utils/jwt.ts';

function checkPermission(permissionRequired: string) {
  return async (req, res, next) => {
    const token = req.cookies?.token;
    if(!token) {
      res.status(401).json({error: "Acesso negado. Autenticação necessária|"});
      return;
    }
    try {
      const decoded = await getTokenData(token);
      const hasPermission = await MeService.checkIfUserHasPermission(decoded.userId, permissionRequired);
      if (!hasPermission) {
        res.status(403).json({error: "Permissão de acesso ausente ou negada."})
        return;
      }
      next()
    } catch (error) {
      res.status(401).json({error: "Token inválido."});
    }
  }
}

export {checkPermission};