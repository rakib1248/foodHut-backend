import { NextFunction, Request, Response } from "express";
import { mealService } from "./meal.service";
import { User } from "../../../generated/prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const getAllMeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const filters = {
        categoryId: req.query.categoryId as string,
        providerId: req.query.providerId as string,
        minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
        isAvailable:
          req.query.isAvailable === "true"
            ? true
            : req.query.isAvailable === "false"
              ? false
              : undefined,
        search: req.query.search as string,
        isVegetarian: req.query.isVegetarian === "true" ? true : undefined,
        isVegan: req.query.isVegan === "true" ? true : undefined,
        isGlutenFree: req.query.isGlutenFree === "true" ? true : undefined,
        sortBy: req.query.sortBy as "price" | "createdAt" | undefined,
        sortOrder: req.query.sortOrder as "asc" | "desc" | undefined,
      };
    const meal = await mealService.getAllMeal(filters);

    res.status(200).json({
      ok: true,
      message: "meal item get successfully",
      data: meal,
    });
  } catch (err) {
    next(err);
  }
};
const getMealById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const meal = await mealService.getMealById(req.params.id as string);

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
const updateMeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const meal = await mealService.updateMeal(
      req.user as User,
      req.body,
      req.params.id as string,
    );

    res.status(200).json({
      ok: true,
      message: "meal Update successfully",
      data: meal,
    });
  } catch (err) {
    next(err);
  }
};
const deleteMeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const meal = await mealService.deleteMeal(
      req.params.id as string,
      req.user as User,
    );

    res.status(200).json({
      ok: true,
      message: "meal Delete successfully",
      data: meal,
    });
  } catch (err) {
    next(err);
  }
};

export const mealController = {
  getAllMeal,
  createMeal,
  updateMeal,
  getMealById,
  deleteMeal,
};
