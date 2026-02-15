import { prisma } from "../../lib/prisma";
const createReview = async (userId, mealId, rating, comment) => {
    if (rating < 1 || rating > 5) {
        throw new Error("Rating must be between 1 and 5.");
    }
    const hasOrdered = await prisma.order.findFirst({
        where: {
            customerId: userId,
            status: "DELIVERED",
            items: {
                some: { mealId: mealId },
            },
        },
    });
    if (!hasOrdered) {
        throw new Error("You can only review meals you have successfully ordered and received.");
    }
    return await prisma.review.create({
        data: {
            customerId: userId,
            mealId: mealId,
            rating: rating,
            comment: comment,
        },
    });
};
const getMealReviews = async (mealId) => {
    return await prisma.review.findMany({
        where: { mealId },
        include: { customer: { select: { name: true, image: true } } },
        orderBy: { createdAt: "desc" },
    });
};
export const reviewService = {
    createReview,
    getMealReviews,
};
