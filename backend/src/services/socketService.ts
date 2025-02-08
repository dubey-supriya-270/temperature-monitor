import * as socketIo from 'socket.io';
import redisAdapter from 'socket.io-redis';
import Temperature from '../db-init/models/temperatureModel';
import { Server } from 'http';
import { addTemperature } from '../controllers/temperature';

// Socket.IO connection setup
export const setupSocketConnection = (server: Server) => {
  const io = new socketIo.Server(server, {
    adapter: redisAdapter(process.env.REDIS_URL) as any,
    cors: {
      origin: process.env.ALLOWED_ORIGINS,
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
    },
  });


  io.on('connection', (socket: socketIo.Socket) => {
    socket.emit('connected', 'Welcome to the real-time temperature monitor!');

    setInterval(async () => {
      try {
        const temp: number = Math.random() * 50;
        const status: string = temp > 30 ? "HIGH" : "NORMAL";
        const newReading = new Temperature({ temperature: temp, status });

        await addTemperature({temperature: temp, status})

        socket.emit('temperature', {
          temperature: temp,
          status: status,
          timestamp: newReading.timestamp.toISOString(),
        });

        io.emit('temperature_data', {
          temperature: temp,
          status: status,
        });
      } catch (err) {
        console.error('Error during data processing:', err);
      }
    }, 2000);
  });

  return io;
};
