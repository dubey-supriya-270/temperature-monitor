import React from 'react';

interface ConnectionStatusProps {
  status: string;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ status }) => {
  return (
    <div className="flex items-center justify-center mb-4">
      <div
        className={`w-2.5 h-2.5 mr-2.5 rounded-full ${status === 'Connected' ? 'bg-green-500' : 'bg-red-500'}`}
      ></div>
      <h2 className="text-2xl font-semibold">
        {status}
      </h2>
    </div>
  );
};

export default ConnectionStatus;
