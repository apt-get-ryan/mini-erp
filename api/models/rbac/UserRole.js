import db from "@/database/database.js";
import { DataTypes } from "sequelize";

const UserRole = db.define(
  "UserRole",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: "user_roles",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["user_id", "role_id"]
      }
    ]
  }
);

export default UserRole;