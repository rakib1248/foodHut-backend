import { Role } from "../../../generated/prisma/enums.js";
import { prisma } from "../../lib/prisma.js";
const getAllMeal = async (filters) => {
    const where = {};
    // Category filter (cuisine)
    if (filters?.categoryId) {
        where.categoryId = filters.categoryId;
    }
    // Provider filter
    if (filters?.providerId) {
        where.providerId = filters.providerId;
    }
    // Price range filter
    if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
        where.price = {};
        if (filters.minPrice !== undefined) {
            where.price.gte = filters.minPrice;
        }
        if (filters.maxPrice !== undefined) {
            where.price.lte = filters.maxPrice;
        }
    }
    // Availability filter
    if (filters?.isAvailable !== undefined) {
        where.isAvailable = filters.isAvailable;
    }
    // Search filter (name or description)
    if (filters?.search) {
        where.OR = [
            { name: { contains: filters.search, mode: "insensitive" } },
            { description: { contains: filters.search, mode: "insensitive" } },
        ];
    }
    return await prisma.meal.findMany({
        where,
        include: { provider: true, category: true, reviews: true },
    });
};
const getMealById = async (id) => {
    return await prisma.meal.findUnique({
        where: { id },
        include: { provider: true, category: true, reviews: true },
    });
};
// create meal with provider
const createMeal = async (user, body) => {
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
const updateMeal = async (user, body, mealId) => {
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
const deleteMeal = async (id, user) => {
    if (user.role === Role.ADMIN) {
        return await prisma.meal.delete({
            where: { id },
        });
    }
    if (user.role === Role.PROVIDER) {
        const provider = await prisma.providerProfile.findUnique({
            where: { userId: user.id },
        });
        if (!provider) {
            throw new Error("Provider profile not found");
        }
        const deleted = await prisma.meal.deleteMany({
            where: {
                id: id,
                providerId: provider.id,
            },
        });
        if (deleted.count === 0) {
            throw new Error("Unauthorized: This meal does not belong to you or does not exist");
        }
        return { message: "Meal deleted successfully" };
    }
    throw new Error("Forbidden: Access denied");
};
export const mealService = {
    getAllMeal,
    createMeal,
    updateMeal,
    getMealById,
    deleteMeal,
};
//# sourceMappingURL=meal.service.js.map