import express from 'express';
import ClienteController from './ClienteController.js';
import verifyToken from '@/middleware/authMiddleware.js';

const router = express.Router();

router.use("/clientes", verifyToken, ClienteController);

const crmRoute = router;
export default crmRoute;