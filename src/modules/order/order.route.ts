import { Router } from "express";
import { orderController } from "./order.controller";
import authMiddleWare from "../../middleware/authMiddleWare";

const router = Router();

router.post("/order" , authMiddleWare("CUSTOMER"),  orderController.createOrder);

export const orderRoute: Router = router;
