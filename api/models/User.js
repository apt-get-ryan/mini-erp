import { DataTypes } from "sequelize";
import db from "../database/database.js";

const User = db.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: { msg: "E-mail inválido"}
    }
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  login: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  data_cadastro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  data_atualizacao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: "users",
  timestamps: false,
  
});


export default User;