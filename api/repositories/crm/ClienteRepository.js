import db from '../../database/database.js';
import {Cliente} from '../../models/crm/models.js';

async function getCliente(id, options = undefined) {
  try {
    const cliente = await Cliente.findByPk(id, options);
    return;
  } catch (error) {
    throw new Error(error);
  }
}

async function getClientes(options = undefined) {
  try {
    const clientes = await Cliente.findAll(options);
    return clientes;
  } catch (error) {
    throw new Error(error);
  }
}

async function createCliente(data) {
  try {
    const cliente = await Cliente.create(data);
    return cliente;
  } catch (error) {
    throw new Error(error);
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
    throw new Error(error);
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

export default ClienteRepository = {
  getCliente,
  getClientes,
  createCliente,
  patchCliente
};