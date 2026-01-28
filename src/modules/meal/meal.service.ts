import { Meal, Role, User } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

// get Provider
const getAllMeal = async () => {
  return await prisma.meal.findMany();
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

export const mealService = {
  getAllMeal,
  createMeal,
};
