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
    },
    valor_pago: {
      type: DataTypes.INTEGER
    }
  },
  {
    tableName: "pedidos",
    timestamps: true
  }
);

Pedido.hasMany()