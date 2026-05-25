import express from "express";
import ClienteService from "@/services/crm/ClienteService.js";
import { HttpError } from "@/utils/HttpError.ts";
import { asyncHandler } from "@/utils/AsyncHandler.js";
import HttpSuccess from "@/utils/HttpSuccess.ts";

const router = express.Router();

router.get("/",
  async (req, res) => {
    const clientes = await ClienteService.getClientes();
    return new HttpSuccess({
      data: clientes
    }).send(res);
  }
);

router.post("/",
  async (req, res) => {
    const data = req.body;
    await ClienteService.createCliente(data);
    return new HttpSuccess({
      message: "Cliente adicionado com sucesso."
    }).send(res);
    res.send({success: true}); // parei aqui, dar uma mensagem ao response successful. para testar o handling
  }
);

const ClienteController = router;

export default ClienteController;