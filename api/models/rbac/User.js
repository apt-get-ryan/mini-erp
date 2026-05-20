import { DataTypes } from "sequelize";
import db from "@/database/database.js";

const User = db.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  login: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  verification_code: {
    type: DataTypes.STRING
  },
  token_version: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: "users",
  timestamps: true,
  
});


export default User;