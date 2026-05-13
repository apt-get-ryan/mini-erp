import db from "../../database/database";
import { DataTypes } from "sequelize";

const Pedido = db.define(
  "Pedidos",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_cliente: {
      type: DataTypes.INTEGER,
    },
  },
  {
    
  }
);

Pedido.hasMany()