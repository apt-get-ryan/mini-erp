import db from '@/database/database.js';
import { HttpError } from '@/utils/HttpError.ts';
import {Cliente} from '@/models/crm/models.js';
import { FindOptions} from "sequelize";
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

async function createCliente(data, options: FindOptions = undefined) {
  try {
    const cliente = await Cliente.create(data, options);
    return cliente;
  } catch (error) {
    throw HttpError.from(error);
  }
}

async function patchCliente(id, data) {
  try {
    const cliente = await Cliente.findByPk(id);
    if(!cliente)
      throw new Error("Cliente não existe");
    cliente.update(data);
    return cliente;
  } catch (error) {
    throw HttpError.from(error);
  }
}

// async function deleteCliente(id) {
//   try {
//     db.transaction(t => {
//       await Cliente.destroy(id)
//     })
//   } catch (error) {
//     throw new Error(error);
//   }
//
// }

const ClienteRepository = {
  getCliente,
  getClientes,
  createCliente,
  patchCliente
};
export default ClienteRepository;