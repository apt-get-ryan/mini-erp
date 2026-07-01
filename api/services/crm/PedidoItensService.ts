import PedidoItensRepository from "@/repositories/crm/PedidoItensRepository.ts";
import { createSchema, updateSchema } from "@/schemas/crm/PedidoItem.ts";
import z from "zod";
import type { FindOptions } from "sequelize";

async function getPedidoItem(idPedido: number, idItem : number) {
  return await PedidoItensRepository.getPedidoItem(idPedido, idItem);
}

async function getPedidoItens(idPedido: number) {
  return await PedidoItensRepository.getPedidoItens(idPedido);
}

async function createPedidoItens(data: any) {
  data = createSchema.parse(data);
  return await PedidoItensRepository.createPedidoItem(data);
}
async function patchPedidoItem(id, data) {
  data = updateSchema.parse(data);
  return await PedidoItensRepository.patchPedidoItem(id, data);
}
async function deletePedidoItem(id) {
  return await PedidoItensRepository.deletePedidoItem(id);
}

const PedidoItensService = {
  getPedidoItem,
  getPedidoItens,
  createPedidoItens,
  patchPedidoItem,
  deletePedidoItem
};

export default PedidoItensService;