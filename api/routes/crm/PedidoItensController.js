import express from "express";
import PedidoItensService from "@/services/crm/PedidoItensService.js";
import { HttpError } from "@/utils/HttpError.ts";
import HttpSuccess from "@/utils/HttpSuccess.ts";
import z from "zod";

// É importado em pedidos
const router = express.Router();

router.get("/:idPedido/itens/:idItem",
  async (req, res) => {
    const idPedido = z.coerce.number().int().nonnegative().parse(req.params.idPedido);
    const idItem = z.coerce.number().int().nonnegative().parse(req.params.idItem);
    const pedidoitem = await PedidoItensService.getPedidoItem(idPedido, idItem);
    return new HttpSuccess({
      data: pedidoitem
    }).send(res);
  }
);

router.get("/:idPedido/itens",
  async (req, res) => {
    const idPedido = z.coerce.number().int().nonnegative().parse(req.params.idPedido);
    const pedidoitens = await PedidoItensService.getPedidoItens(idPedido);
    return new HttpSuccess({
      data: pedidoitens
    }).send(res);
  }
);


router.post("/itens",
  async (req, res) => {
    const data = req.body;
    const idPedidoItens = await PedidoItensService.createPedidoItens(data);
    return new HttpSuccess({
      message: "Item do pedido adicionado com sucesso.",
      data: idPedidoItens
    }).send(res);
  }
);

router.patch("/itens/:id",
  async (req, res) => {
    const {id} = req.params;
    const data = req.body;
    await PedidoItensService.patchPedidoItem(id, data);
    return new HttpSuccess({
      message: "Item do pedido editado com sucesso."
    }).send(res);
  }
)

router.delete("/itens/:id",
  async (req, res) => {
    const {id} = req.params;
    await PedidoItensService.deletePedidoItem(id);
    return new HttpSuccess({
      message: "PedidoItens deletado com sucesso."
    }).send(res);
  }
)

const PedidoItensController = router;

export default PedidoItensController;