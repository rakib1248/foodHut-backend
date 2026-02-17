import { mealService } from "./meal.service.js";
// declare global {
//   namespace Express {
//     interface Request {
//       user?: any;
//     }
//   }
// }
const getAllMeal = async (req, res, next) => {
    try {
        const filters = {
            categoryId: req.query.categoryId,
            providerId: req.query.providerId,
            minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
            maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
            isAvailable: req.query.isAvailable === "true"
                ? true
                : req.query.isAvailable === "false"
                    ? false
                    : undefined,
            search: req.query.search,
            isVegetarian: req.query.isVegetarian === "true" ? true : undefined,
            isVegan: req.query.isVegan === "true" ? true : undefined,
            isGlutenFree: req.query.isGlutenFree === "true" ? true : undefined,
            sortBy: req.query.sortBy,
            sortOrder: req.query.sortOrder,
        };
        const meal = await mealService.getAllMeal(filters);
        res.status(200).json({
            ok: true,
            message: "meal item get successfully",
            data: meal,
        });
    }
    catch (err) {
        next(err);
    }
};
const getMealById = async (req, res, next) => {
    try {
        const meal = await mealService.getMealById(req.params.id);
        res.status(200).json({
            ok: true,
            message: "meal item get successfully",
            data: meal,
        });
    }
    catch (err) {
        next(err);
    }
};
const createMeal = async (req, res, next) => {
    try {
        const meal = await mealService.createMeal(req.user, req.body);
        res.status(200).json({
            ok: true,
            message: "meal item get successfully",
            data: meal,
        });
    }
    catch (err) {
        next(err);
    }
};
const updateMeal = async (req, res, next) => {
    try {
        const meal = await mealService.updateMeal(req.user, req.body, req.params.id);
        res.status(200).json({
            ok: true,
            message: "meal Update successfully",
            data: meal,
        });
    }
    catch (err) {
        next(err);
    }
};
const deleteMeal = async (req, res, next) => {
    try {
        const meal = await mealService.deleteMeal(req.params.id, req.user);
        res.status(200).json({
            ok: true,
            message: "meal Delete successfully",
            data: meal,
        });
    }
    catch (err) {
        next(err);
    }
};
export const mealController = {
    getAllMeal,
    createMeal,
    updateMeal,
    getMealById,
    deleteMeal,
};
//# sourceMappingURL=meal.controller.js.map