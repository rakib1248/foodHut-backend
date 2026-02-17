import { Router } from "express";
import { providerController } from "./provider.controller.js";
import authMiddleWare from "../../middleware/authMiddleWare.js";
const router = Router();
router.get("/provider", providerController.getprovider);
router.get("/provider/:id", providerController.getProviderById);
router.post("/provider", authMiddleWare("PROVIDER"), providerController.createprovider);
// router.post(
//   "/provider",
//   authMiddleWare("PROVIDER"),
//   providerController.createprovider,
// );
export const providerRoute = router;
//# sourceMappingURL=provider.route.js.map