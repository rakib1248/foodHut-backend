import { Meal, Role, User } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

// get Provider
const getAllMeal = async () => {
  return await prisma.meal.findMany({
    include: { provider: true },
  });
};
const getMealById = async (id: string) => {
  return await prisma.meal.findUnique({
    where: { id },
    include: { provider: true, category: true, reviews: true },
  });
};

// create meal with provider

const createMeal = async (user: User, body: Meal) => {
  if (user.role !== Role.PROVIDER) {
    throw new Error("Forbidden: Only Provider can create meal");
  }

  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId: user.id },
  });
  if (!providerProfile) {
    throw new Error("you can must be Update Your profile");
  }

  return await prisma.meal.create({
    data: {
      ...body,
      providerId: providerProfile.id,
    },
  });
};
const updateMeal = async (user: User, body: Partial<Meal>, mealId: string) => {
  if (user.role !== Role.PROVIDER) {
    throw new Error("Forbidden: Only providers can update meals");
  }

  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId: user.id },
  });

  if (!providerProfile) {
    throw new Error("Please complete your provider profile first");
  }

  const meal = await prisma.meal.findUnique({
    where: { id: mealId },
  });

  if (!meal) {
    throw new Error("Meal not found");
  }

  if (meal.providerId !== providerProfile.id) {
    throw new Error("Forbidden: You can only update your own meals");
  }

  return prisma.meal.update({
    where: { id: mealId },
    data: {
      name: body.name,
      description: body.description,
      price: body.price,
      image: body.image,
      isAvailable: body.isAvailable,
    },
  });
};

export const mealService = {
  getAllMeal,
  createMeal,
  updateMeal,
  getMealById,
};
