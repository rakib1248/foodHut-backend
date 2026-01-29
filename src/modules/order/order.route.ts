import { Router } from "express";
import { orderController } from "./order.controller";
import authMiddleWare from "../../middleware/authMiddleWare";

const router = Router();

router.post("/order", authMiddleWare("CUSTOMER"), orderController.createOrder);
router.patch(
  "/order/:orderId",
  authMiddleWare("CUSTOMER"),
  orderController.cancelOrderByCustomer,
);
router.patch(
  "/order/status/:orderId",
  authMiddleWare("PROVIDER"),
  orderController.updateOrderStatusByProvider,
);
router.get("/order", authMiddleWare(), orderController.getrders);

export const orderRoute: Router = router;
