import ClienteRepository from "@/repositories/crm/ClienteRepository.js";
import {createSchema, updateSchema} from "@/schemas/crm/Cliente.ts";
import type { FindOptions } from "sequelize";

async function getClientes(options: FindOptions = undefined) {
  return await ClienteRepository.getClientes(options);
}

async function getCliente(id, options: FindOptions = undefined) {
  return await ClienteRepository.getCliente(id, options);
}

async function createCliente(data) {
  data = createSchema.parse(data);
  return await ClienteRepository.createCliente(data);
}
async function patchCliente(id, data) {
  data = updateSchema.parse(data);
  return await ClienteRepository.patchCliente(id, data);
}
async function deleteCliente(id) {
  return await ClienteRepository.deleteCliente(id);
}

const ClienteService = {
  getClientes,
  getCliente,
  createCliente,
  patchCliente,
  deleteCliente
};

export default ClienteService;