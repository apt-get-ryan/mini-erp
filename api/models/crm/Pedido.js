import db from "@/database/database.js";
import { DataTypes } from "sequelize";

const Pedido = db.define(
  "Pedido",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      references: {
        model: "clientes",
        key: "id"
      }
    },
    custo_frete: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    tableName: "pedidos",
    timestamps: true
  }
);

export default Pedido;