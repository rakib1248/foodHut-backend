import { Router } from "express";
import { mealController } from "./meal.controller.js";
import authMiddleWare from "../../middleware/authMiddleWare.js";
const router = Router();
router.get("/meal", mealController.getAllMeal);
router.get("/meal/:id", mealController.getMealById);
router.post("/meal", authMiddleWare("PROVIDER"), mealController.createMeal);
router.patch("/meal/:id", authMiddleWare("PROVIDER", "ADMIN"), mealController.updateMeal);
router.delete("/meal/:id", authMiddleWare("PROVIDER", "ADMIN"), mealController.deleteMeal);
export const mealRoute = router;
//# sourceMappingURL=meal.route.js.map