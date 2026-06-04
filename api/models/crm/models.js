import Cliente from "./Cliente.js";
import Produto from "./Produto.js";
import Categoria from "./Categoria.js";
import ProdutoCategoria from "./ProdutoCategoria.js";

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
)


export { 
  Cliente,
  Produto,
  Categoria
};