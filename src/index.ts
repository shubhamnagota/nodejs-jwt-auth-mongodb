import dotenv from "dotenv";
import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

import router from "./router";

const app = express();
app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(express.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log(`Listening on http://localhost:8080`);
});

mongoose.Promise = Promise;
mongoose.connect(process.env.DATABASE_URL || "");
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/", router());
