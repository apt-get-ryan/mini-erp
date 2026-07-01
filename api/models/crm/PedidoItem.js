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
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "pedidos",
        key: "id"
      }
    },

    id_produto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    valor: {
      type: DataTypes.INTEGER, // valor em centavos,
      allowNull: false
    },

    quantidade: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false
    }
  },
  {
    tableName: "pedido_itens",
    timestamps: true
  }
);

export default PedidoItem;