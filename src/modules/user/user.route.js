import { Router } from "express";
import authMiddleWare from "../../middleware/authMiddleWare";
import { userController } from "./user.controller";
const router = Router();
router.get("/user", authMiddleWare(), userController.getUserRoleBase);
router.patch("/user/:id", authMiddleWare(), userController.updateUser);
export const userRoute = router;
