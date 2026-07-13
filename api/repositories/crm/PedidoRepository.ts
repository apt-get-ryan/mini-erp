import { Pedido, Cliente, PedidoItem, Pagamento } from "@/models/models.js";
import { HttpError } from "@/utils/HttpError.ts";
import { fn, col, literal } from "sequelize";

async function getPedidos(options = undefined) {
  try {
    let data = await Pedido.findAll({
      attributes: [
        "id",
        "id_cliente",
        "custo_frete",
        "createdAt",
        "updatedAt",
        [
          literal(`(
            SELECT COALESCE(SUM(itens.valor * itens.quantidade), 0)
            FROM pedido_itens AS itens
            WHERE itens.id_pedido = Pedido.id
          )`),
          "valor_total"
        ],
        [
          literal(`(
            SELECT COALESCE(SUM(pagamentos.valor), 0)
            FROM pagamentos AS pagamentos
            WHERE pagamentos.id_pedido = Pedido.id
          )`),
          "valor_pago"
        ]
      ],
      include: [
        {
          model: Cliente,
          as: "cliente",
          attributes: ["nomeFantasia"],
          required: false
        },
      ],
      group: [
        "Pedido.id"
      ]
    });
    console.log(data);
    return data;
  } catch (error) {
    throw HttpError.from(error);
  }
}

async function getPedido(id) {
  try {
    let pedido = await Pedido.findByPk(id, {
      attributes: [
        "id",
        "id_cliente",
        "custo_frete",
        "createdAt",
        "updatedAt",
        [
          literal(`(
            SELECT COALESCE(SUM(itens.valor * itens.quantidade), 0)
            FROM pedido_itens AS itens
            WHERE itens.id_pedido = Pedido.id
          )`),
          "valor_total"
        ],
        [
          literal(`(
            SELECT COALESCE(SUM(pagamentos.valor), 0)
            FROM pagamentos AS pagamentos
            WHERE pagamentos.id_pedido = Pedido.id
          )`),
          "valor_pago"
        ]
      ],
      include: [
        {
          model: Cliente,
          as: "cliente",
          attributes: ["nomeFantasia"],
          required: false
        },
      ],
      group: [
        "Pedido.id"
      ]
    });
    return pedido;
  } catch (error) {
    throw HttpError.from(error);
  }
}

async function createPedido() {
  try {
    const pedido = await Pedido.create();
    if(!pedido)
      throw new HttpError("Não foi possível criar o pedido");
    return (pedido as any).id;
  } catch (error) {
    throw HttpError.from(error);
  }
}

async function patchPedido(id, data) {
  try {
    const pedido = await Pedido.findByPk(id);
    if(!pedido)
      throw new HttpError("Não foi possível encontrar os dados para editar", 404);
    await pedido.update(data);
    return;
  } catch (error) {
    throw HttpError.from(error);
  }
}

async function deletePedido(id) {
  try {
    const pedido = await Pedido.findByPk(id);
    if(!pedido)
      throw new HttpError("Não foi possível encontrar os dados para deletar", 404);
    await pedido.destroy();
    return;
  } catch (error) {
    throw HttpError.from(error);
  }
}

async function setClienteToPedido(idCliente: number, idPedido : number) {
  try {
    const pedido = await Pedido.findOne( 
      { 
        where: {
          id: idPedido,
          id_cliente: null
        }
      }
    );
    if(!pedido)
      throw new HttpError("Não foi possível encontrar os dados para deletar ou o cliente já está definido para este pedido", 404);
    await pedido.update({
      id_cliente: idCliente
    });
    return;
  } catch (error) {
    throw HttpError.from(error);
  }
}

const PedidoRepository = {
  getPedido,
  getPedidos,
  createPedido,
  patchPedido,
  deletePedido,
  setClienteToPedido
};
export default PedidoRepository;