import db from "@/database/database.js";
import { DataTypes } from "sequelize";

const Permission = db.define(
  "Permission",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    resource: {
      type: DataTypes.STRING(50),
      allowNull: false
    },

    action: {
      type: DataTypes.STRING(50),
      allowNull: false
    },

    descricao: {
      type: DataTypes.STRING(100)
    }
  },
  {
    tableName: "permissions",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["resource", "action"]
      }
    ]
  }
);

export default Permission;