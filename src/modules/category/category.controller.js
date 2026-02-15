import { categoryService } from "./category.service";
const creatCategory = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ ok: false, message: "Unauthorized" });
        }
        const category = await categoryService.createCategory(req.user, req.body);
        res.status(200).json({
            ok: true,
            data: category,
        });
    }
    catch (err) {
        next(err);
    }
};
const getAllCategory = async (req, res, next) => {
    try {
        const category = await categoryService.getAllCategory();
        res.status(200).json({
            ok: true,
            data: category,
        });
    }
    catch (err) {
        next(err);
    }
};
const updateCategory = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ ok: false, message: "Unauthorized" });
        }
        const { id } = req.params;
        const category = await categoryService.updateCategory(id, req.user, req.body);
        res.status(200).json({
            ok: true,
            data: category,
        });
    }
    catch (err) {
        next(err);
    }
};
const deleteCategory = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ ok: false, message: "Unauthorized" });
        }
        const { id } = req.params;
        const category = await categoryService.deleteCategory(id, req.user);
        res.status(200).json({
            ok: true,
            data: category,
        });
    }
    catch (err) {
        next(err);
    }
};
export const categoryController = {
    creatCategory,
    updateCategory,
    deleteCategory,
    getAllCategory,
};
