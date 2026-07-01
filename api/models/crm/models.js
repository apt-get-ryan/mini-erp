import Cliente from "./Cliente.js";
import Produto from "./Produto.js";
import Categoria from "./Categoria.js";
import ProdutoCategoria from "./ProdutoCategoria.js";

import Pedido from "./Pedido.js";
import PedidoItem from "./PedidoItem.js";

Categoria.belongsToMany(
  Produto,
  {
    through: ProdutoCategoria,
    foreignKey: "categoria_id",
    otherKey: "produto_id",
    onDelete: "CASCADE",
    as: "produtos"
  }
)
Produto.belongsToMany(
  Categoria,
  {
    through: ProdutoCategoria,
    foreignKey: "produto_id",
    otherKey: "categoria_id",
    onDelete: "CASCADE",
    as: "categorias",
  }
);

Pedido.hasMany(
  PedidoItem,
  {
    foreignKey: "id_pedido",
    as: "itens",
    onDelete: "CASCADE"
  }
);
PedidoItem.belongsTo(
  Pedido,
  {
    as: "pedido",
    foreignKey: "id_pedido",
    onDelete: "CASCADE"
  }
);



PedidoItem.belongsTo(
  Produto,
  {
    as: "produto",
    foreignKey: "id_produto"
  }
);
Pedido.belongsTo(
  Cliente,
  {
    as: "cliente",
    foreignKey: "id_cliente"
  }
);

const atualizarPedido = async (pedidoItem, options) => {
  try {
    const now = new Date();
    const pedido = await Pedido.findByPk(pedidoItem.id_pedido);
    pedido.set('updatedAt', new Date());
    pedido.changed('updatedAt', true);
    /*
      Estranhamente apenas a linha acima foi capaz de permitir a atualização acontecer.
      E fazer a atualização direta com .update não funcionou
     */
    await pedido.save();
    console.log(pedido);
  } catch (error) {
    console.log(error)
  }
};
PedidoItem.addHook("afterDestroy", atualizarPedido)
PedidoItem.addHook("afterSave", atualizarPedido)

export { 
  Cliente,
  Produto,
  Categoria,
  Pedido,
  PedidoItem
};