import { auth as betterAuth } from "../lib/auth.js";
const authMiddleWare = (...roles) => {
    return async (req, res, next) => {
        try {
            const sasstion = await betterAuth.api.getSession({
                headers: req.headers,
            });
            if (!sasstion) {
                return res.status(401).json({
                    success: false,
                    message: "You are not authorized! Please Logine Then Try",
                });
            }
            req.user = {
                id: sasstion.user.id,
                email: sasstion.user.email,
                name: sasstion.user.name,
                role: sasstion.user.role,
                emailVerified: sasstion.user.emailVerified,
                image: sasstion.user.image,
            };
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden! You don't have permission to access this resources!",
                });
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
export default authMiddleWare;
//# sourceMappingURL=authMiddleWare.js.map