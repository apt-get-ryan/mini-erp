import db from "@/database/database.js";
import { DataTypes } from "sequelize";

const PedidoItem = db.define(
  "PedidoItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    id_pedido: {
      type: DataTypes.NUMBER,
      allowNull: false
    },

    id_produto: {
      type: DataTypes.NUMBER,
      allowNull: false
    },

    quantidade: {
      type: DataTypes.NUMBER,
      allowNull: false
    }
  },
  {
    tableName: "pedido_itens",
    timestamps: true
  }
)