import { authService } from "./auth.service.js";
const getUser = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ ok: false, message: "Unauthorized" });
        }
        const user = await authService.getUserById(req.user.id);
        res.status(200).json({
            ok: true,
            data: user,
        });
    }
    catch (err) {
        next(err);
    }
};
export const authController = {
    getUser,
};
//# sourceMappingURL=auth.controller.js.map