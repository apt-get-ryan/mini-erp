import express from 'express';
import ClienteController from './ClienteController.js';
import {verifyToken} from '@/middleware/authMiddleware.js';
import CategoriaController from './CategoriaController.js';
import ProdutoController from './ProdutoControlle.js';

const router = express.Router();

router.use("/clientes", verifyToken, ClienteController);
router.use("/categorias", verifyToken, CategoriaController);
router.use("/produtos", verifyToken, ProdutoController);

const crmRoute = router;
export default crmRoute;