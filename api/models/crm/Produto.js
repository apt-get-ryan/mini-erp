import db from "@/database/database.js";
import { DataTypes } from "sequelize";

const Produto = db.define("Produto", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: "O nome deve ter entre 1 a 100 caracteres."
        }
      }
    },

    descricao: {
      type: DataTypes.STRING(200),
      allowNull: true
    },

    preco: {
      type: DataTypes.INTEGER, // VALOR EM CENTAVOS, EM CENTAVOS
      allowNull: false
    },

    custo: {
      type: DataTypes.INTEGER, // VALOR EM CENTAVOS, EM CENTAVOS
      allowNull: false
    },
  },
  {
    tableName: "produtos",
    timestamps: true
  }
);

export default Produto;