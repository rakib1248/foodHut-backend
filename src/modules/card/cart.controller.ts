import { Request, Response, NextFunction } from "express";
import { cartService } from "./card .service";

const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ ok: false, message: "Unauthorized" });
    }

    const userId = req.user.id;
    const { mealId, quantity } = req.body;

    if (!mealId) {
      return res
        .status(400)
        .json({ ok: false, message: "Meal ID is required" });
    }

    const cartItem = await cartService.addToCart(userId, mealId, quantity || 1);

    res.status(200).json({
      ok: true,
      message: "Item added to cart successfully",
      data: cartItem,
    });
  } catch (err) {
    next(err);
  }
};
const getCartItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ ok: false, message: "Unauthorized" });
    }

    const userId = req.user.id;

    const cartItem = await cartService.getCartItem(userId);

    res.status(200).json({
      ok: true,
      message: "Cart Item Get successfully",
      data: cartItem,
    });
  } catch (err) {
    next(err);
  }
};

export const cartController = {
    addToCart,
    getCartItem
};
