import { RolePermission, Role } from "@/models/models.js";
import db from "@/database/database.js";
import { HttpError } from "@/utils/HttpError.ts";

const getRolePermission = async (roleId) => {
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
    throw HttpError.from(error)
  }
}

const saveRolePermission = async ({role_id, permission_id}) => {
  try {
    return await RolePermission.create({role_id, permission_id})
  } catch (error) {
    throw HttpError.from(error)
  }

}

const setPermissionsToRole = async (roleId, permissions) => {
  try {
    const result = db.transaction(async t => {
      const role = await Role.findByPk(roleId, {
        attributes: ['id']
      });
      await role.setPermissions(permissions, { transaction: t});

    });

    return;
  } catch (error) {
    throw HttpError.from(error)
  }
}


export default {
  getRolePermission,
  saveRolePermission,
  setPermissionsToRole
}