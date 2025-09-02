import UserController from './UserController.js';

import express from 'express';

const router = express.Router();

router.use("/", UserController);

export default router;
