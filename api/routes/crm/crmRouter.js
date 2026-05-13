import express from 'express';
import ClienteController from './ClienteController.js';
import verifyToken from '../../middleware/authMiddleware.js';

const router = express.Router();

router.use("/cliente", verifyToken, ClienteController);

export default crmRoute = router;