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
  }
);

router.patch("/:id",
  async (req, res) => {
    const {id} = req.params;
    const data = req.body;
    await ClienteService.patchCliente(id, data);
    return new HttpSuccess({
      message: "Cliente editado com sucesso."
    }).send(res);
  }
)

router.delete("/:id",
  async (req, res) => {
    const {id} = req.params;
    await ClienteService.deleteCliente(id);
    return new HttpSuccess({
      message: "Cliente deletado com sucesso."
    }).send(res);
  }
)

const ClienteController = router;

export default ClienteController;