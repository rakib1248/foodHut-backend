import { Router } from "express";
import authMiddleWare from "../../middleware/authMiddleWare";
import { cartController } from "./cart.controller";

const router = Router();

router.post("/card", authMiddleWare("CUSTOMER"), cartController.addToCart);
router.get("/card", authMiddleWare("CUSTOMER"), cartController.getCartItem);

export const cardRoute: Router = router;
