import User from "./rbac/User.js";

import Role from "./rbac/Role.js";
import Permission from "./rbac/Permission.js";
import RolePermission from "./rbac/RolePermission.js";
import UserRole from "./rbac/UserRole.js";
import Module from "./rbac/Module.js";
import ModulePermission from "./rbac/ModulePermission.js";

/*
========================================
ASSOCIAÇÕES RBAC
========================================
*/

/*
User ↔ Role
Many-to-Many através de UserRole
*/
User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: "user_id",
  otherKey: "role_id",
  onDelete: 'CASCADE'
});

Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: "role_id",
  otherKey: "user_id",
  onDelete: 'CASCADE'
});


/*
Role ↔ Permission
Many-to-Many através de RolePermission
*/
Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: "role_id",
  otherKey: "permission_id",
  onDelete: 'CASCADE'
});

Permission.belongsToMany(Role, {
  through: RolePermission,
  foreignKey: "permission_id",
  otherKey: "role_id",
  onDelete: 'CASCADE'
});


/*
Module -> Permission
1 Module possui uma permissão
***Manter nesse formato
*/
Module.belongsToMany(Permission, {
  through: ModulePermission,
  foreignKey: "module_id",
  otherKey: "permission_id",
  onDelete: 'CASCADE'
});
Permission.belongsToMany(Module, {
  through: ModulePermission,
  foreignKey: "permission_id",
  otherKey: "module_id",
  onDelete: 'CASCADE'
});


/*
========================================
EXPORTAÇÃO CENTRAL
========================================
*/

export {
  User,
  Role,
  Permission,
  Module,
  UserRole,
  RolePermission,
  ModulePermission
};