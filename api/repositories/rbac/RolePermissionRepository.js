import { RolePermission, Role } from "../../models/models.js";
import db from "../../database/database.js";

const getRolePermissions = async (roleId) => {
  try {
    const role = await Role.findByPk(roleId, {attributes: ['id']});
    const permissions = await role.getPermissions({
      attributes: ['id', 'resource', 'action'],
      joinTableAttributes: [],
      raw: true,
      order: [
        ['id', 'ASC']
      ]
    })
    return permissions;
  } catch(error) {
    throw new Error(error);
  }
}

const saveRolePermission = async ({role_id, permission_id}) => {
  try {
    return await RolePermission.create({role_id, permission_id})
  } catch (error) {
    throw new Error(error);
  }

}

const setPermissionsToRole = async (roleId, permissions) => {
  try {
    const result = db.transaction(async t => {
      const role = await Role.findByPk(roleId, {
        attributes: ['id']
      });
      await role.setPermissions(permissions, { transaction: t});
      // const newPermissions = role.getPermissions({
      //   attributes: ['id', 'resource', 'action'],
      // })
    });

    //throw new Error();
    
    return result;

  } catch (error) {
    throw new Error(error);
  }
}

// const updateRolePermission = async (id, data) => {
//   try {
//     const [updatedRows] = await RolePermission.update(data, { where: { id: id}});
//     if(!updatedRows)
//       throw new Error("0 rows changed")
//     return { success: true };
//   } catch (error) {
//     throw new Error(error);
//   }
// }

export default {
  getRolePermissions,
  saveRolePermission,
  setPermissionsToRole
}