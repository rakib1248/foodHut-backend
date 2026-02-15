import { reviewService } from "./review.service";
const createReview = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ ok: false, message: "Unauthorized" });
        }
        const userId = req.user.id;
        const { mealId, rating, comment } = req.body;
        const result = await reviewService.createReview(userId, mealId, rating, comment);
        res.status(201).json({
            ok: true,
            message: "Review added successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
export const reviewController = {
    createReview,
};
