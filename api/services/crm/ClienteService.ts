import ClienteRepository from "@/repositories/crm/ClienteRepository.js";
import {createSchema} from "@/schemas/crm/Cliente.ts";
import type { Cliente } from "@/schemas/crm/Cliente.ts";
import { HttpError } from "@/utils/HttpError.ts";
import type { FindOptions } from "sequelize";

async function getClientes(options: FindOptions = undefined) {
  return await ClienteRepository.getClientes(options);
}

async function getCliente(id, options: FindOptions = undefined) {
  return await ClienteRepository.getCliente(id, options);
}

async function createCliente(data: Cliente, options: FindOptions = undefined) {
  createSchema.parse(data);
  return await ClienteRepository.createCliente(data, options);
}

const ClienteService = {
  getClientes,
  getCliente,
  createCliente

};

export default ClienteService;