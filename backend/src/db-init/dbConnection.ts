require("dotenv").config({ override: true });
import mongoose from "mongoose";

const mongoURL = process.env["MONGODB_URI"];

export let database: mongoose.Connection;

export const createConnection = () => {
  // URI based on Environment

  if (database) {
    return;
  }
  mongoose.connect(mongoURL!);
  database = mongoose.connection;
  database.once("open", async () => {
    console.log("Connected to database");
  });
  database.on("error", () => {
    console.log("ALERT => Error connecting to database");
  });
};

export const disconnect = () => {
  if (!database) {
    return;
  }
  mongoose.disconnect();
};