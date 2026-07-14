import express from "express";
import ClienteService from "@/services/crm/ClienteService.js";
import { HttpError } from "@/utils/HttpError.ts";
import HttpSuccess from "@/utils/HttpSuccess.ts";
import {checkPermission} from "@/middleware/permissionMiddleware.js";

const router = express.Router();
router.get("/",
  checkPermission("**clientes**"),
  async (req, res) => {
    const simplified = req.query.simplified === "true";
    let clientes = [];
    if(simplified) {
      clientes = await ClienteService.getClientes({
        attributes: ["id", "nomeFantasia"]
      });
    } else {
      clientes = await ClienteService.getClientes();
    }
    return new HttpSuccess({
      data: clientes
    }).send(res);
  }
);

router.post("/",
  checkPermission("**clientes**"),
  async (req, res) => {
    const data = req.body;
    await ClienteService.createCliente(data);
    return new HttpSuccess({
      message: "Cliente adicionado com sucesso."
    }).send(res);
  }
);

router.patch("/:id",
  checkPermission("**clientes**"),
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
  checkPermission("**clientes**"),
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