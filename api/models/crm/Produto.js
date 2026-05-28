import db from "@/database/database";
import { DataTypes } from "sequelize";

const Produtos = db.define(
  "Produtos",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    nome: {
      type: DataTypes.STRING(50),
      allowNull: false
    },

    descricao: {
      type: DataTypes.STRING(200),
      allowNull: false
    },

    preco: {
      type: DataTypes.INTEGER, // VALOR EM CENTAVOS, EM CENTAVOS
      allowNull: false
    },

    custo: {
      type: DataTypes.INTEGER, // VALOR EM CENTAVOS, EM CENTAVOS
      allowNull: false
    },

    categoria: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: "produtos",
    timestamps: true
  }
);

export default Produtos;