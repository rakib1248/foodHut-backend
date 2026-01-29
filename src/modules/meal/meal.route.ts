import { Router } from "express";
import { mealController } from "./meal.controller";
import authMiddleWare from "../../middleware/authMiddleWare";

const router = Router();
router.get("/meal", mealController.getAllMeal);
router.get("/meal/:id", mealController.getMealById);
router.post("/meal", authMiddleWare("PROVIDER"), mealController.createMeal);
router.patch(
  "/meal/:id",
  authMiddleWare("PROVIDER"),
  mealController.updateMeal,
);

export const mealRoute: Router = router;
