import { Router } from "express";
import authMiddleWare from "../../middleware/authMiddleWare";
import { reviewController } from "./review.controller";
const router = Router();
router.post("/creat-review", authMiddleWare("CUSTOMER"), reviewController.createReview);
export const reviewRoute = router;
