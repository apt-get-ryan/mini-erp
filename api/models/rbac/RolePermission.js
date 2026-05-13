import db from "../../database/database.js";
import { DataTypes } from "sequelize";

const RolePermission = db.define(
  "RolePermission",
  {
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: "role_permissions",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["role_id", "permission_id"]
      }
    ]
  }
);

export default RolePermission;