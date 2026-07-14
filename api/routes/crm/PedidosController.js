import express from "express";
import PedidoService from "@/services/crm/PedidoService.js";
import { HttpError } from "@/utils/HttpError.ts";
import HttpSuccess from "@/utils/HttpSuccess.ts";
import { z } from "zod";
import PedidoItensController from "./PedidoItensController.js";
import PagamentoController from "./PagamentoController.js";
import { updateSchema } from "@/schemas/crm/Pedido.ts";
import { checkPermission } from "@/middleware/permissionMiddleware.ts";

const router = express.Router();
router.get("/",
  checkPermission("**pedidos**"),
  async (req, res) => {
    const pedidos = await PedidoService.getPedidos();
    return new HttpSuccess({
      data: pedidos
    }).send(res);
  }
);

router.get("/:id",
  checkPermission("**pedidos**"),
  async (req, res) => {
    const id = z.coerce.number().int().nonnegative().parse(req.params.id);
    const pedido = await PedidoService.getPedido(id);
    return new HttpSuccess({
      data: pedido
    }).send(res);
  }
)

router.post("/",
  checkPermission("**pedidos**"),
  async (req, res) => {
    const idPedido = await PedidoService.createPedido();
    return new HttpSuccess({
      message: "Pedido adicionado com sucesso.",
      data: idPedido
    }).send(res);
  }
);

router.patch("/:id",
  checkPermission("**pedidos**"),
  async (req, res) => {
    const {id} = req.params;
    const data = updateSchema.parse(req.body);
    await PedidoService.patchPedido(id, data);
    return new HttpSuccess({
      message: "Pedido editado com sucesso."
    }).send(res);
  }
)

router.delete("/:id",
  checkPermission("**pedidos**"),
  async (req, res) => {
    const {id} = req.params;
    await PedidoService.deletePedido(id);
    return new HttpSuccess({
      message: "Pedido deletado com sucesso."
    }).send(res);
  }
);

router.post("/:idPedido/cliente",
  checkPermission("**pedidos**"),
  async (req, res) => {
    const idPedido = z.coerce.number().int().positive().parse(req.params.idPedido)
    const idCliente = z.coerce.number().int().positive().parse(req.body.id_cliente);
    await PedidoService.setClienteToPedido(idCliente, idPedido);
    
    return new HttpSuccess({
      message: "Cliente vinculado ao pedido com sucesso."
    }).send(res);
  }
);

router.use(checkPermission("**pedidos**"), PedidoItensController);
router.use(checkPermission("**pedidos**"), PagamentoController);

const PedidoController = router;

export default PedidoController;