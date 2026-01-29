import { NextFunction, Request, Response } from "express";
import { orderService } from "./order.service";
import { User } from "../../../generated/prisma/client";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ ok: false, message: "Unauthorized" });
    }
    const order = await orderService.createOrder(req.user.id, req.body.address);
    res.status(201).json({ ok: true, data: order });
  } catch (err) {
    next(err);
  }
};
const getrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ ok: false, message: "Unauthorized" });
    }
    const order = await orderService.getOrders(req.user as User);
    res.status(201).json({ ok: true, data: order });
  } catch (err) {
    next(err);
  }
};

export const orderController = {
  createOrder,
  getrders,
};
