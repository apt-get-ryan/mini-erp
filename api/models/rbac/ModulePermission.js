import db from "@/database/database.js";
import { DataTypes } from "sequelize";

const ModulePermission = db.define(
  "ModulePermission",
  {
    module_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: "module_permissions",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["module_id", "permission_id"]
      }
    ]
  }
);

export default ModulePermission;