import * as socketIo from "socket.io";
import redisAdapter from "socket.io-redis";
import Temperature from "../db-init/models/temperatureModel";
import { Server } from "http";
import {
  addTemperature,
  findAndUpdateTemperatureStatus,
} from "../repositories/temperature";
import axios from "axios";

export const setupSocketConnection = (server: Server) => {
  const io = new socketIo.Server(server, {
    adapter: redisAdapter(process.env.REDIS_URL) as any,
    cors: {
      origin: process.env.ALLOWED_ORIGINS,
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
    },
  });

  io.on("connection", (socket: socketIo.Socket) => {
    socket.emit("connected", "Welcome to the real-time temperature monitor!");

    setInterval(() => emitTemperatureData(socket, io), 2000);
  });

  return io;
};

const emitTemperatureData = async (
  socket: socketIo.Socket,
  io: socketIo.Server
) => {
  try {
    const temp: number = Math.random() * 50;
    const status: string = "NORMAL";

    const newReading = new Temperature({
      temperature: temp,
      status,
    });

    const response = await addTemperature({ temperature: temp, status });

    socket.emit("temperature_raw", {
      temperature: temp,
      status: status,
      uniqueId: response.data,
      timestamp: newReading.timestamp.toISOString(),
    });

    io.emit("temperature_data_raw", {
      temperature: temp,
      status: status,
      uniqueId: response.data,
    });

    const dataToSend = {
      temperature: temp,
      status: status,
      uniqueId: response.data["_id"],
    };

    const n8nResponse = await axios.post(
      process.env.N8N_WEBHOOK_URL,
      dataToSend
    );

    if (n8nResponse.data) {
      const processedData = n8nResponse.data;

      await findAndUpdateTemperatureStatus(
        response.data["_id"],
        processedData[0]["status"]
      );

      socket.emit("temperature_processed", {
        temperature: temp,
        status: processedData[0]["status"],
        uniqueId: response.data["_id"],
        timestamp: newReading.timestamp.toISOString(),
      });

      io.emit("temperature_data_processed", {
        temperature: temp,
        status: processedData[0]["status"],
        uniqueId: response.data["_id"],
      });
    }
  } catch (err) {
    console.error("Error during data processing:", err);
  }
};
