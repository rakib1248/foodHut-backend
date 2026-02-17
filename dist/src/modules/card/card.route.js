import { Router } from "express";
import authMiddleWare from "../../middleware/authMiddleWare.js";
import { cartController } from "./cart.controller.js";
const router = Router();
router.post("/card", authMiddleWare("CUSTOMER"), cartController.addToCart);
router.get("/card", authMiddleWare("CUSTOMER"), cartController.getCartItem);
router.patch("/card/:cartItemId", authMiddleWare("CUSTOMER"), cartController.updateQuantity);
router.delete("/card/:cartItemId", authMiddleWare("CUSTOMER"), cartController.removeItem);
export const cardRoute = router;
//# sourceMappingURL=card.route.js.map