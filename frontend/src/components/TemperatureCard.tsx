import React from 'react';
import timeAgo from '../helpers/timeAgo';

interface TemperatureCardProps {
  temperature: number;
  status: string;
  timestamp: number;
}

const TemperatureCard: React.FC<TemperatureCardProps> = ({ temperature, status, timestamp }) => {
  return (
    <div className="p-6 bg-blue-50 rounded-lg shadow-md">
      <div className="flex flex-col justify-center items-center">
        <h5>Current Temperature</h5>
        <div>
          <h3 className="text-3xl font-bold text-gray-800">{temperature.toFixed(1)}°C</h3>
        </div>
        <div className="flex items-center">
          <p
            className={`text-lg font-semibold ${
              status === 'HIGH' ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {status}
          </p>
          <span className="ml-2 text-sm text-gray-500 flex items-center">
            <span
              className={`w-2.5 h-2.5 mr-2.5 rounded-full ${
                status === 'HIGH' ? 'bg-red-500' : 'bg-green-500'
              }`}
            ></span>
            Last updated: {timeAgo(timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TemperatureCard;
