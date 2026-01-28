import { Router } from "express";
import { providerController } from "./provider.controller";
import authMiddleWare from "../../middleware/authMiddleWare";

const router: Router = Router();

router.get("/provider", providerController.getprovider);
router.post(
  "/provider",
  authMiddleWare("PROVIDER"),
  providerController.createprovider,
);
router.get("/provider/:id", providerController.getProviderById);


router.post(
  "/provider",
  authMiddleWare("PROVIDER"),
  providerController.createprovider,
);

export const providerRoute: Router = router;
