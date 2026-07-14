import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;



const db = new Sequelize(
  "mini_erp_db", DB_USER, DB_PASS, 
  {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql",
    logging: false,
    timezone: "-03:00"
  }
)

async function connect() {
  try {
    await db.authenticate();
    console.log("Database conectado!");
  } catch (error) {
    console.log("Database connection failed!");
    console.log(error);
  }
}

connect();

export default db;