import { getTokenData } from '../utils/jwt.ts';
import { env } from '@/utils/env.ts';

const JWT_KEY = env.JWT_KEY;


function checkPermission(permissionsRequired: string[]) {
  return async (req, res, next) => {
    const token = req.cookies?.token;
    if(!token) {
      res.status(401).json({error: "Acesso negado. Autenticação necessária|"});
      return;
    }
    
    try {
      const decoded = await getTokenData(token);
      const hasPermission = validatePermissions(permissionsRequired, decoded.userPermissions);
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

function validatePermissions(required: string[], list: string[]) {
  return required.every(requirement => {
    // verifica se a permissão só pede qualquer resource de um determinado tipo
    // ou seja, nome do resource entre 2 "*"
    const resourceOnly = /^\*{2}(.*)\*{2}$/.test(requirement);
    if(resourceOnly) {
      return list.some(listItem => listItem.split(":")[0] == requirement.replaceAll("**", ""));
    } else {
      return list.includes(requirement);
    }
  })
};


export {checkPermission};