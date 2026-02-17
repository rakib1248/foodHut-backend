
import { NextFunction, Request, Response } from "express";
import { orderService } from "./order.service.js";
import { User } from "../../../generated/prisma/client.js";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ ok: false, message: "Unauthorized" });
    }
    const order = await orderService.createOrder(req.user.id, req.body.address);
    res
      .status(201)
      .json({ ok: true, data: order, message: "order complete successfully" });
  } catch (err) {
    next(err);
  }
};
const getrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ ok: false, message: "Unauthorized" });
    }
    const order = await orderService.getOrders(req.user as User);
    res
      .status(201)
      .json({ ok: true, data: order, message: "get Order successfully" });
  } catch (err) {
    next(err);
  }
};
const cancelOrderByCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ ok: false, message: "Unauthorized" });
    }
    const order = await orderService.cancelOrderByCustomer(
      req.params.orderId as string,
      req.user.id as string,
    );
    res
      .status(201)
      .json({ ok: true, data: order, message: "order Calcell successfully" });
  } catch (err) {
    next(err);
  }
};
const updateOrderStatusByProvider = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ ok: false, message: "Unauthorized" });
    }
    const order = await orderService.updateOrderStatusByProvider(
      req.params.orderId as string,
      req.body.status,
      req.user.id as string,
    );
    res.status(201).json({
      ok: true,
      data: order,
      message: "order status update successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const orderController = {
  createOrder,
  getrders,
  cancelOrderByCustomer,
  updateOrderStatusByProvider,
};
