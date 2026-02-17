import { Router } from "express";
import authMiddleWare from "../../middleware/authMiddleWare.js";
import { reviewController } from "./review.controller.js";

const router = Router();

router.post(
  "/creat-review",
  authMiddleWare("CUSTOMER"),
  reviewController.createReview,
);

export const reviewRoute: Router = router;
