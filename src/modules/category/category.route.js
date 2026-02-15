import { Router } from "express";
import authMiddleWare from "../../middleware/authMiddleWare";
import { categoryController } from "./category.controller";
const router = Router();
router.get("/category", categoryController.getAllCategory);
router.post("/category", authMiddleWare("ADMIN", "PROVIDER"), categoryController.creatCategory);
router.patch("/category/:id", authMiddleWare("ADMIN", "PROVIDER"), categoryController.updateCategory);
router.delete("/category/:id", authMiddleWare("ADMIN", "PROVIDER"), categoryController.deleteCategory);
export const categoryRoute = router;
