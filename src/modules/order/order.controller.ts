import { NextFunction, Request, Response } from "express";
import { orderService } from "./order.service";
import { User } from "../../../generated/prisma/client";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderService.createOrder(req.user as User, req.body);
    res.status(201).json({ ok: true, data: order });
  } catch (err) {
    next(err);
  }
};


export const orderController = {
  createOrder
}
