import { Produto, Categoria } from "@/models/models.js";
import { HttpError } from "@/utils/HttpError.ts";
import db from "@/database/database.js";

async function getProdutos(options = undefined) {
  try {
    return await Produto.findAll(options);
  } catch (error) {
    throw HttpError.from(error);
  }
}

async function getProduto(id) {
  try {
    let produto = await Produto.findByPk(id, {
      attributes: ['nome', 'descricao', 'preco', 'custo'],
      include: [
        {
          model: Categoria,
          through: { attributes: []},
          attributes: ['id'],
          as: 'categorias',
          required: false
        }
      ]
    }) as any;
    produto = produto.get({plain: true});
    produto.custo = produto.custo / 100;
    produto.preco = produto.preco / 100;
    produto.categorias = produto.categorias.map( c => c.id.toString())
    return produto;
  } catch (error) {
    throw HttpError.from(error);
  }
}

async function createProduto(data, categorias) {
  try {
    return await db.transaction(async (t) => {
      const produto = await Produto.create(data, {transaction: t}) as any;
      await produto.setCategorias(categorias, {transaction: t});
      return;
    });
  } catch (error) {
    throw HttpError.from(error);
  }
}

async function patchProduto(id, data, categorias: number[]) {
  try {
    const produto = await Produto.findByPk(id);
    if(!produto)
      throw new HttpError("Não foi possível encontrar os dados para editar", 404);
    return await db.transaction(async (t) => {
      await produto.update(data, {transaction: t});
      await (produto as any).setCategorias(categorias, {transaction: t});
      return;
    })
  } catch (error) {
    throw HttpError.from(error);
  }
}

async function deleteProduto(id) {
  try {
    const produto = await Produto.findByPk(id);
    if(!produto)
      throw new HttpError("Não foi possível encontrar os dados para deletar", 404);
    await produto.destroy();
    return;
  } catch (error) {
    throw HttpError.from(error);
  }
}

const ProdutoRepository = {
  getProduto,
  getProdutos,
  createProduto,
  patchProduto,
  deleteProduto
};
export default ProdutoRepository;