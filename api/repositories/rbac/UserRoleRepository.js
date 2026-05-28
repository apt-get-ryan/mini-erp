import { UserRole, Role, User } from "@/models/models.js";
import db from "@/database/database.js";
import { HttpError } from "@/utils/HttpError.ts";

const saveUserRole = async (userId, roleId) => {
  try {
    return await UserRole.create({user_id: userId, role_id: roleId});
  } catch (error) {
    throw HttpError.from(error)
  }
}

const getRolesByUserId = async (userId) => {
  try {
    return await Role.findAll({
      attributes: ['id', 'nome', 'descricao'],
      include: [{
        model: User,
        through: { attributes: [ ]},
        attributes: [],
        where: {
          id: userId
        }
      }]
    });
  } catch(error) {
    throw HttpError.from(error)
  }
}

const setRolesToUser = async (userId, roles) => {
  try {
    const result = await db.transaction(async t => {
      const user = await User.findByPk(userId, {
        attributes: ['id']
      });
      await user.setRoles(roles, { transaction: t});
      const newRoles = await user.getRoles({
        attributes: ['id', 'nome'],
        joinTableAttributes: [],
        raw: true
      });
      return ;
    });
    return;
  } catch (error) {
    throw HttpError.from(error)
  }
}

export default {
  saveUserRole,
  getRolesByUserId,
  setRolesToUser
}