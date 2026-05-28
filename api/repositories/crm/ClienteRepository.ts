import { HttpError } from '@/utils/HttpError.ts';
import {Cliente} from '@/models/crm/models.js';
import { FindOptions } from "sequelize";
async function getCliente(id, options = undefined) {
  try {
    const cliente = await Cliente.findByPk(id, options);
    return cliente;
  } catch (error) {
    throw HttpError.from(error);
  }
}

async function getClientes(options = undefined) {
  try {
    const clientes = await Cliente.findAll(options);
    return clientes;
  } catch (error) {
    throw HttpError.from(error);
  }
}

async function createCliente(data) {
  try {
    await Cliente.create(data);
    return;
  } catch (error) {
    throw HttpError.from(error);
  }
}

async function patchCliente(id, data) {
  try {
    const cliente = await Cliente.findByPk(id);
    if(!cliente)
      throw new HttpError("Não foi possível encontrar os dados para editar", 404);
    await cliente.update(data);
    return cliente;
  } catch (error) {
    throw HttpError.from(error);
  }
}

async function deleteCliente(id) {
  try {
    const cliente = await Cliente.findByPk(id);
    if(!cliente)
      throw new HttpError("Não foi possível encontrar os dados para deletar", 404);
    await cliente.destroy();
    return;
  } catch (error) {
    throw HttpError.from(error);
  }
}

const ClienteRepository = {
  getCliente,
  getClientes,
  createCliente,
  patchCliente,
  deleteCliente
};
export default ClienteRepository;