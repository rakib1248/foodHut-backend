import { providerService } from "./provider.service";
const createprovider = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ ok: false, message: "Unauthorized" });
        }
        const requester = req.user;
        const Data = req.body;
        const provider = await providerService.createProvider(requester, Data);
        res.status(200).json({
            ok: true,
            message: "profile updated successfully",
            data: provider,
        });
    }
    catch (err) {
        next(err);
    }
};
const getprovider = async (req, res, next) => {
    try {
        const provider = await providerService.getProvider();
        res.status(200).json({
            ok: true,
            message: "provider profile  get successfully",
            data: provider,
        });
    }
    catch (err) {
        next(err);
    }
};
const getProviderById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const provider = await providerService.getProviderById(id);
        res.status(200).json({
            ok: true,
            message: "provider profile and item get successfully",
            data: provider,
        });
    }
    catch (err) {
        next(err);
    }
};
export const providerController = {
    createprovider,
    getprovider,
    getProviderById,
};
