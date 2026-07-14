import express from "express";
import PagamentoService from "@/services/crm/PagamentoService.js";
import HttpSuccess from "@/utils/HttpSuccess.ts";
import { createSchema } from "@/schemas/crm/Pagamento.ts";
import z from "zod";
import {checkPermission} from "@/middleware/permissionMiddleware.js";

const router = express.Router();

router.get("/:idPedido/pagamentos",
  async (req, res) => {
    const idPedido = z.coerce.number().int().nonnegative().parse(req.params.idPedido);
    const pagamentos = await PagamentoService.getPagamentosPorIdDoPedido(idPedido);

    return new HttpSuccess({
      data: pagamentos
    }).send(res);
  }
);

router.post("/:idPedido/pagamentos",
  async (req, res) => {
    const idPedido = z.coerce.number().int().nonnegative().parse(req.params.idPedido);
    const data = createSchema.parse({...req.body, id_pedido: idPedido});
    await PagamentoService.createPagamento(data);

    return new HttpSuccess({
      message: "Pagamento adicionado com sucesso."
    }).send(res);
  }
);

const PagamentoController = router;

export default PagamentoController;
