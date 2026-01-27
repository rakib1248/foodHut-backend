import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ ok: false, message: "Unauthorized" });
    }

    const user = await authService.getUserById(req.user.id);

    res.status(200).json({
      ok: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const authController = {
  getUser,
};
