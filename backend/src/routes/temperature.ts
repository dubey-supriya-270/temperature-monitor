import express, { Request, Response, NextFunction } from "express";
import * as temperatureController from "../controllers/temperature";
import { ITemperature } from "../interfaces/temperature";
import { Result } from "../interfaces/result";

const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { temperature, status } = req.body;

    const data: ITemperature = {
      temperature,
      status,
    };

    const result: Result = await temperatureController.addTemperature(data);

    if (result.isError()) {
      throw result.error;
    }

    res.status(200).json({
      status: 200,
      message: `Temperature added successfully`,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result: Result<ITemperature[]> =
      await temperatureController.retrieveTemperature();

    if (result.isError()) {
      throw result.error;
    }

    res.status(200).json({
      status: 200,
      data: result.data,
      message: `Retrieved temperature data successfully`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
