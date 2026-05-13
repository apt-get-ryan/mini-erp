import express from 'express';
import rbacRouter from './rbac/rbacRouter.js';
import crmRouter from './crm/crmRouter.js';
// import verifyToken from '../midlleware/authMiddleware.js';
// import checkPermission from '../midlleware/permissionMiddleware.js'

// import UserAuthController from './rbac/UserAuthController.js';
// import UserController from './rbac/UserController.js';
// import RoleController from ".rbac//RoleController.js";
// import UserRoleController from "./rbac/UserRoleController.js";

// import PermissionController from "./rbac/PermissionController.js";
// import RolePermissionController from './rbac/RolePermissionController.js';

// import ModuleController from './rbac/ModuleController.js';
// import ModulePermissionController from "./rbac/ModulePermissionController.js";

// import MeController from "./rbac/MeController.js";

const router = express.Router();

// router.use("/auth", UserAuthController);
// router.use("/modules", verifyToken, checkPermission(["**module**"]), ModuleController);
// router.use("/users", verifyToken, checkPermission(["**user**"]), UserController);
// router.use("/roles", verifyToken, checkPermission(["**role**"]), RoleController);
// router.use("/userRoles", verifyToken, checkPermission(["**user_role**"]), UserRoleController);
// router.use("/permissions", verifyToken, checkPermission(["**permission**"]), PermissionController);
// router.use("/rolePermissions", verifyToken, checkPermission(["**role_permission**"]), RolePermissionController);
// router.use("/modulePermissions", verifyToken, /*checkPermission(),*/ ModulePermissionController);
// router.use("/me", verifyToken, MeController);
router.use(rbacRouter);
router.use(crmRouter);


router.use((req, res) => {
  res.status(404).send({ error: "Not found", message: `A rota ${req.method} ${req.originalUrl} não foi encontrada`})
})

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Erro inesperado no servidor",
  });
});

export default router;
