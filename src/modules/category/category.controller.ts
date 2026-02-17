import { NextFunction, Request, Response } from "express";
import { categoryService } from "./category.service.js";
import { User } from "../../../generated/prisma/client.js";

const creatCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ ok: false, message: "Unauthorized" });
    }

    const category = await categoryService.createCategory(
      req.user as User,
      req.body,
    );

    res.status(200).json({
      ok: true,
      data: category,
    });
  } catch (err) {
    next(err);
  }
};
const getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const category = await categoryService.getAllCategory();

    res.status(200).json({
      ok: true,
      data: category,
    });
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ ok: false, message: "Unauthorized" });
    }
    const { id } = req.params;

    const category = await categoryService.updateCategory(
      id as string,
      req.user as User,
      req.body,
    );

    res.status(200).json({
      ok: true,
      data: category,
    });
  } catch (err) {
    next(err);
  }
};
const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ ok: false, message: "Unauthorized" });
    }
    const { id } = req.params;

    const category = await categoryService.deleteCategory(
      id as string,
      req.user as User,
    );

    res.status(200).json({
      ok: true,
      data: category,
    });
  } catch (err) {
    next(err);
  }
};

export const categoryController = {
  creatCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
};
