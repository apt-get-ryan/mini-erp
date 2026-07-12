import db from "@/database/database.js";
import { DataTypes } from "sequelize";

const Pagamento = db.define(
  "Pagamento",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    id_pedido: {
      type: DataTypes.INTEGER,
      references: {
        model: "pedidos",
        key: "id"
      }
    },

    valor: {
      type: DataTypes.INTEGER, // valor em centavos
    }
  },
  {
    tableName: "pagamentos",
    timestamps: true,
  }
)

export default Pagamento;