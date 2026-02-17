import { Router } from "express";
import authMiddleWare from "../../middleware/authMiddleWare.js";
import { userController } from "./user.controller.js";
const router = Router();
router.get("/user", authMiddleWare(), userController.getUserRoleBase);
router.patch("/user/:id", authMiddleWare(), userController.updateUser);
export const userRoute = router;
//# sourceMappingURL=user.route.js.map