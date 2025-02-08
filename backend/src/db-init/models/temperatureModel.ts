import mongoose, { Schema } from 'mongoose';
import { ITemperature } from '../../interfaces/temperature';


const temperatureSchema: Schema = new Schema(
  {
    temperature: { type: Number, required: true },
    status: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  },
  { timestamps: true }
);


const Temperature = mongoose.model<ITemperature>('Temperature', temperatureSchema, 'temperature');

export default Temperature;
