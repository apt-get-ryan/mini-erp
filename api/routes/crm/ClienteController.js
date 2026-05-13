import express from "express";
import ClienteService from "../../services/crm/ClienteService.js";
const router = express.Router();

router.get("/",
  async (req, res) => {
    try {
      const clientes = await ClienteService.getClientes();
      res.send(clientes);
    } catch (error) {
      res.status(500).send({error: error.message});
    }
  }
);

router.post("/",
  async (req, res) => {
    const data = req.body;
    try {
      await ClienteService.createCliente(data);
      res.send({success: true});
    } catch (error) {
      res.status(500).send({error: error.message});
    }
  }
)


export default ClienteController = router;