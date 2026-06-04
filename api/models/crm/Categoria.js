import db from "@/database/database.js";
import { DataTypes } from "sequelize";

const Categoria = db.define(
  "Categoria",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    nome: {
      type: DataTypes.STRING(35),
      allowNull: false
    },

    descricao: {
      type: DataTypes.STRING(70),
      allowNull: true,
      defaultValue: null
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },

    id_parent: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "categorias",
        key: "id"
      }
    }
}, {
  tableName: "categorias",
  timestamps: true
});

export default Categoria;