import { Router } from "express";
import { authController } from "./auth.controller.js";
import authMiddleWare from "../../middleware/authMiddleWare.js";

const router: Router = Router();

router.get("/me", authMiddleWare(), authController.getUser);

export const authRoute: Router = router;
