import { cartService } from "./card .service";
const addToCart = async (req, res, next) => {
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
    }
    catch (err) {
        next(err);
    }
};
const getCartItem = async (req, res, next) => {
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
    }
    catch (err) {
        next(err);
    }
};
const updateQuantity = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ ok: false, message: "Unauthorized" });
        }
        const { cartItemId } = req.params;
        const { quantity } = req.body;
        const userId = req.user.id;
        const result = await cartService.updateCartItemQuantity(userId, cartItemId, quantity);
        res.status(200).json({ ok: true, data: result });
    }
    catch (err) {
        next(err);
    }
};
const removeItem = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ ok: false, message: "Unauthorized" });
        }
        const { cartItemId } = req.params;
        const userId = req.user.id;
        await cartService.removeCartItem(userId, cartItemId);
        res.status(200).json({ ok: true, message: "Item removed successfully" });
    }
    catch (err) {
        next(err);
    }
};
export const cartController = {
    addToCart,
    getCartItem,
    updateQuantity,
    removeItem
};
