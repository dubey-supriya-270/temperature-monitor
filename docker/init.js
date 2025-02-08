db = db.getSiblingDB('temperatureDB'); // Switch to the desired database

// Create a collection and insert initial data
db.temperature.insertMany([
  { temperature: 22.5, status: 'NORMAL', timestamp: new Date() },
  { temperature: 23.0, status: 'NORMAL', timestamp: new Date() },
  { temperature: 24.5, status: 'HIGH', timestamp: new Date() }
]);
