import db from "@/database/database.js";
import { DataTypes, INTEGER } from "sequelize";
import Categoria from "./Categoria.js";

const ProdutoCategoria = db.define(
  "ProdutoCategoria",
  {
    produto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "produtos",
        key: "id"
      }
    },
    categoria_id: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: "categorias",
        key: "id"
      }
    }
  },
  {
    tableName: "produto_categoria",
    timestamps: false,
    indexes: [{
      unique: true,
      fields: ["produto_id", "categoria_id"]
    }]
  }
);

export default ProdutoCategoria;