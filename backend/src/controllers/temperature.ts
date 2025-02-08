import { Result } from "../interfaces/result";
import { ITemperature } from "../interfaces/temperature";
import * as temperatureRepositories from "../repositories/temperature";

export const addTemperature = async (data: ITemperature) => {
  try {
    const result: Result = await temperatureRepositories.addTemperature(data);

    if (result.isError()) {
      throw result.error;
    }

    return Result.ok(result.data);
  } catch (error) {
    return Result.error(error);
  }
};

export const retrieveTemperature = async () => {
  try {
    const temperatureExist: Result<ITemperature[]> =
      await temperatureRepositories.retrieveTemperature();

    if (temperatureExist.isError()) {
      throw temperatureExist.error;
    }

    return Result.ok(temperatureExist.data);
  } catch (error) {
    return Result.error(error);
  }
};
