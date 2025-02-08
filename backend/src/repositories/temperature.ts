import STATUS from "../constants/statusCode";
import Temperature from "../db-init/models/temperatureModel";
import { Result } from "../interfaces/result";
import { ITemperature } from "../interfaces/temperature";
import { ObjectId } from "mongoose";

export const addTemperature = async (data: ITemperature): Promise<Result> => {
  try {
    const result = await Temperature.create(data);

    return Result.ok(result);
  } catch (error) {
    return Result.error({
      statusCode: STATUS.BAD_REQUEST,
      customMessage: `Unable to add temperature`,
    });
  }
};

export const retrieveTemperature = async (): Promise<
  Result<ITemperature[]>
> => {
  try {
    const result = await Temperature.find().sort({ timestamp: -1 }).limit(10);

    return Result.ok(result);
  } catch (error) {
    // returning success as false
    return Result.error({
      statusCode: STATUS.BAD_REQUEST,
      customMessage: `Unable to fetch temperature`,
    });
  }
};

export const findAndUpdateTemperatureStatus = async (
  uniqueId: string,
  status: string
): Promise<Result<ITemperature>> => {
  try {
    const updatedRecord = await Temperature.findOneAndUpdate(
      { _id: uniqueId  },
      {
        $set: {
          status: status
        },
      },
      { new: true }
    );

    if (!updatedRecord) {

      return Result.error({
        statusCode: STATUS.NOT_FOUND,
        customMessage: `Temperature record with uniqueId ${uniqueId} not found`,
      });
    }

    return Result.ok(updatedRecord);
  } catch (error) {

    return Result.error({
      statusCode: STATUS.BAD_REQUEST,
      customMessage: `Unable to update temperature status: ${error.message}`,
    });
  }
};
