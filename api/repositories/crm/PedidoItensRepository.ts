import { PedidoItem, Produto } from "@/models/models.js";
import { HttpError } from "@/utils/HttpError.ts";

async function getPedidoItem(idPedido, idItem) {
  try {
    return await PedidoItem.findOne({
      where: {
        id: idItem,
        id_pedido: idPedido 
      }
    });
  } catch (error) {
    throw HttpError.from(error);
  }
}

async function getPedidoItens(idPedido, options = undefined) {
  try {
    return await PedidoItem.findAll({
      where: {
        id_pedido: idPedido
      },
      include: [{
        model: Produto,
        as: "produto",
        attributes: ["nome"],
      }]
    });
  } catch (error) {
    throw HttpError.from(error);
  }
}


async function createPedidoItem(data) {
  try {
    const pedidoItem = await PedidoItem.create(data);
    if(!pedidoItem)
      throw new HttpError("Não foi possível criar o pedidoitens");
    return (pedidoItem as any).id;
  } catch (error) {
    throw HttpError.from(error);
  }
}

async function patchPedidoItem(id, data) {
  try {
    const pedidoItem = await PedidoItem.findByPk(id);
    if(!pedidoItem)
      throw new HttpError("Não foi possível encontrar os dados para editar", 404);
    await pedidoItem.update(data);
    return;
  } catch (error) {
    throw HttpError.from(error);
  }
}

async function deletePedidoItem(id) {
  try {
    const pedidoItem = await PedidoItem.findByPk(id);
    if(!pedidoItem)
      throw new HttpError("Não foi possível encontrar os dados para deletar", 404);
    await pedidoItem.destroy();
    return;
  } catch (error) {
    throw HttpError.from(error);
  }
}

const PedidoItensRepository = {
  getPedidoItem,
  getPedidoItens,
  createPedidoItem,
  patchPedidoItem,
  deletePedidoItem
};
export default PedidoItensRepository;