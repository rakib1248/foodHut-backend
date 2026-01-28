import { Router } from "express";
import { mealController } from "./meal.controller";
import authMiddleWare from "../../middleware/authMiddleWare";

const router = Router();
router.get("/meal", mealController.getAllMeal);
router.post("/meal"  , authMiddleWare("PROVIDER"), mealController.createMeal);

export const mealRoute: Router = router;
