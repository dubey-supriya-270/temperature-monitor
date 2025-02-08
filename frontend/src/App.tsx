import React, { useState, useEffect } from "react";
import TemperatureCard from "./components/TemperatureCard";
import ConnectionStatus from "./components/ConnectionStatus";
import io from "socket.io-client";
import timeAgo from "./helpers/timeAgo";

interface Reading {
  temperature: number;
  status: string;
  timestamp: string;
}

const App: React.FC = () => {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [status, setStatus] = useState<string>("NORMAL");
  const [connectionStatus, setConnectionStatus] =
    useState<string>("Disconnected");
  const [readings, setReadings] = useState<Reading[]>([]);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_URL);

    socket.on("connect", () => {
      setConnectionStatus("Connected");
    });

    socket.on("temperature", (data) => {
      setTemperature(data.temperature);
      setStatus(data.status);

      setReadings((prevReadings) => {
        const newReadings = [...prevReadings, data];
        return newReadings.length > 5 ? newReadings.slice(1) : newReadings;
      });
    });

    socket.on("disconnect", () => {
      setConnectionStatus("Disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-semibold text-center text-gray-700 mb-6">
            Temperature Monitor
          </h1>

          <ConnectionStatus status={connectionStatus} />
        </div>

        <div className="my-4">
          <TemperatureCard
            temperature={temperature ?? 0} 
            status={status}
            timestamp={Date.now()}
          />
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-800">
            Recent Readings
          </h3>
          <ul className="space-y-3 mt-4">
            {readings.map((reading, index) => (
              <li
                key={index}
                className="flex justify-between p-4 bg-gray-50 rounded-lg shadow-sm"
              >
                <div className="flex flex-col">
                  <span className="text-lg font-medium">
                    {reading.temperature.toFixed(1)}°C
                  </span>
                  <span className="text-sm text-gray-500">
                    {timeAgo(new Date(reading.timestamp).getTime())}
                  </span>
                </div>
                <div
                  className={`text-lg font-medium ${
                    reading.status === "HIGH"
                      ? "text-red-500"
                      : "text-green-500"
                  } text-center py-2 px-4 rounded-lg shadow-md`}
                >
                  {reading.status}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
