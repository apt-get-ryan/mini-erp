import db from "../../database/database.js";
import { DataTypes } from "sequelize";

const Role = db.define(
  "Role",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    descricao: {
      type: DataTypes.STRING(100)
    }
  },
  {
    timestamps: true,
    tableName: "roles"
  }
);

export default Role;