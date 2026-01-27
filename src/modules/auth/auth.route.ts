import { Router } from "express";
import { authController } from "./auth.controller";
import authMiddleWare from "../../middleware/authMiddleWare";

const router: Router = Router();

router.get("/me", authMiddleWare(), authController.getUser);

export const authRoute: Router = router;
