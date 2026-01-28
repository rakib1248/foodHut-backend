import { Router } from "express";

import authMiddleWare from "../../middleware/authMiddleWare";
import { categoryController } from "./category.controller";

const router: Router = Router();

router.get("/category", categoryController.getAllCategory);

router.post(
  "/category",
  authMiddleWare("ADMIN"),
  categoryController.creatCategory,
);

router.patch(
  "/category/:id",
  authMiddleWare("ADMIN"),
  categoryController.updateCategory,
);

router.delete(
  "/category/:id",
  authMiddleWare("ADMIN"),
  categoryController.deleteCategory,
);

export const categoryRoute: Router = router;
