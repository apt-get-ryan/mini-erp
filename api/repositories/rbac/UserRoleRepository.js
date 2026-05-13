import { UserRole, Role, User } from "../../models/models.js";
import db from "../../database/database.js";

const saveUserRole = async (userId, roleId) => {
  try {
    return await UserRole.create({user_id: userId, role_id: roleId});
  } catch (error) {
    throw new Error(error);
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
    throw new Error(error);
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
      return newRoles;
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

export default {
  saveUserRole,
  getRolesByUserId,
  setRolesToUser
}