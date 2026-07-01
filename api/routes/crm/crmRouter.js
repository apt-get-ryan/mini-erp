import express from 'express';
import ClienteController from './ClienteController.js';
import {verifyToken} from '@/middleware/authMiddleware.js';
import CategoriaController from './CategoriaController.js';
import ProdutoController from './ProdutoControlle.js';
import PedidoController from './PedidosController.js';
import PedidoItensController from './PedidoItensController.js';

const router = express.Router();

router.use("/clientes", verifyToken, ClienteController);
router.use("/categorias", verifyToken, CategoriaController);
router.use("/produtos", verifyToken, ProdutoController);
router.use("/pedidos", verifyToken, PedidoController);
// router.use("/pedido-itens", verifyToken, PedidoItensController);

const crmRoute = router;
export default crmRoute;