import express from "express";
import config from "./config";
import router from "./routes";
import mongoose from "mongoose";
import errorHandler from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(router);
app.use(errorHandler);

mongoose.connect(config.BD_URL);
app.listen(config.PORT, () => {
  console.info(`App started, PORT = ${config.PORT}`);
});
