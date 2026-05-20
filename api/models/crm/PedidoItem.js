import db from "@/database/database";
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

    produto: {
      type: DataTypes.NUMBER,
      allowNull: false
    },

    quantidade: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    
    pago: {
      type: DataTypes.BOOLEAN,
      defaultValue: FALSE
    }
  }
)