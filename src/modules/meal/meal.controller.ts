import { NextFunction, Request, Response } from "express";
import { mealService } from "./meal.service";
import { User } from "../../../generated/prisma/client";

const getAllMeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const meal = await mealService.getAllMeal();

    res.status(200).json({
      ok: true,
      message: "meal item get successfully",
      data: meal,
    });
  } catch (err) {
    next(err);
  }
};
const createMeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const meal = await mealService.createMeal(req.user as User, req.body);

    res.status(200).json({
      ok: true,
      message: "meal item get successfully",
      data: meal,
    });
  } catch (err) {
    next(err);
  }
};

export const mealController = {
  getAllMeal,
  createMeal,
};
