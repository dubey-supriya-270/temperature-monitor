import STATUS from "../constants/statusCode";
import Temperature from "../db-init/models/temperatureModel";
import { Result } from "../interfaces/result";
import { ITemperature } from "../interfaces/temperature";

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
