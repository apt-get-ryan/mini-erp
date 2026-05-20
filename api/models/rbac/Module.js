import db from "@/database/database.js";
import { DataTypes } from "sequelize";

const Module = db.define(
  "Module",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    slug: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },

    rota: {
      type: DataTypes.STRING(200)
    },

    icone: {
      type: DataTypes.STRING(50)
    },

    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sort_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    tableName: "modules",
    timestamps: true
  }
);

export default Module;