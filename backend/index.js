import express from "express";
import db from "./config/Database.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log("database conneted");
  //   await db.sync();
} catch (error) {
  console.log(error);
}
app.use(express.json());
app.use(cookieParser());
app.use(userRoutes);



app.listen(5000, () => console.log("server runnig"));
