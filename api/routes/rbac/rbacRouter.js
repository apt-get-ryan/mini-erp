import express from 'express';
import verifyToken from '../../middleware/authMiddleware.js';
import checkPermission from '../../middleware/permissionMiddleware.js'

import UserAuthController from './UserAuthController.js';
import UserController from './UserController.js';
import RoleController from "./RoleController.js";
import UserRoleController from "./UserRoleController.js";

import PermissionController from "./PermissionController.js";
import RolePermissionController from './RolePermissionController.js';

import ModuleController from './ModuleController.js';
import ModulePermissionController from "./ModulePermissionController.js";

import MeController from "./MeController.js";

const router = express.Router();

router.use("/auth", UserAuthController);
router.use("/modules", verifyToken, checkPermission(["**module**"]), ModuleController);
router.use("/users", verifyToken, checkPermission(["**user**"]), UserController);
router.use("/roles", verifyToken, checkPermission(["**role**"]), RoleController);
router.use("/userRoles", verifyToken, checkPermission(["**user_role**"]), UserRoleController);
router.use("/permissions", verifyToken, checkPermission(["**permission**"]), PermissionController);
router.use("/rolePermissions", verifyToken, checkPermission(["**role_permission**"]), RolePermissionController);
router.use("/modulePermissions", verifyToken, /*checkPermission(),*/ ModulePermissionController);
router.use("/me", verifyToken, MeController);


export default rbacRouter = router;