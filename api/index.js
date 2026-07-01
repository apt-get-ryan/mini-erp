import express from "express";
import cookieParser from "cookie-parser";
import pkg from 'body-parser'
import db from "./database/database.js";
import router from "./routes/router.js";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;

const app = express();
const { json, urlencoded} = pkg;

app.use(json());
app.use(cookieParser());
app.use(urlencoded({extended: true}));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(router);

// db.sync();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
