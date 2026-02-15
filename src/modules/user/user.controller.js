import { userService } from "./user.service";
const getUserRoleBase = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ ok: false, message: "Unauthorized" });
        }
        const paylode = req?.user;
        const user = await userService.getUserRoleBase(paylode);
        res.status(200).json({
            ok: true,
            data: user,
        });
    }
    catch (err) {
        next(err);
    }
};
const updateUser = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ ok: false, message: "Unauthorized" });
        }
        const { id } = req.params;
        const requester = req.user;
        const updateData = req.body;
        const user = await userService.updateUser(id, updateData, requester);
        res.status(200).json({
            ok: true,
            message: "User updated successfully",
            data: user,
        });
    }
    catch (err) {
        next(err);
    }
};
export const userController = {
    getUserRoleBase,
    updateUser,
};
