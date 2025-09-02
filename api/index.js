import express from "express";
import pkg from 'body-parser'
import db from "./database/database.js";
import router from "./routes/router.js";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

const app = express();
const { json, urlencoded} = pkg;


app.use(json());
app.use(urlencoded({extended: true}));
app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
