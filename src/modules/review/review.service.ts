import { prisma } from "../../lib/prisma.js";

const createReview = async (
  userId: string,
  mealId: string,
  rating: number,
  comment: string,
) => {


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
    throw new Error(
      "You can only review meals you have successfully ordered and received.",
    );
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


const getMealReviews = async (mealId: string) => {
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
