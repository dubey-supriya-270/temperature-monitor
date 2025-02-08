import dotenv from "dotenv";
dotenv.config();

import { createServer } from "http";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { setupSocketConnection } from "./services/socketService";
import { createConnection } from "./db-init/dbConnection";
import temperature from "./routes/temperature";
import error from "./middlewares/error";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

const server = createServer(app);

app.use("/api/temperatures", temperature);

app.use(error);

const port: number = parseInt(process.env.PORT || "5000");

if (process.env.NODE_ENV !== "test") {
  createConnection();

  setupSocketConnection(server);

  server
    .listen(port, "0.0.0.0", () => {
      console.log(`Server is listening on port ${port}`);
    })
    .on("error", (err) => {
      console.log(JSON.stringify(err));
    });
}

export default app;
