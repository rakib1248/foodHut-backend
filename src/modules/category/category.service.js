import { Role } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
const getAllCategory = async () => {
    const category = await prisma.category.findMany({
        include: { meals: true },
    });
    return category;
};
const createCategory = async (user, body) => {
    if (user.role === Role.CUSTOMER) {
        throw new Error("Forbidden: Only admins can create categories");
    }
    const category = await prisma.category.create({
        data: {
            name: body.name,
            image: body.image,
            publicId: body.publicId,
        },
    });
    return category;
};
// Update Category
const updateCategory = async (id, user, body) => {
    if (user.role === Role.CUSTOMER) {
        throw new Error("Forbidden: Only admins can update categories");
    }
    return await prisma.category.update({
        where: { id: id },
        data: {
            ...(body.name && { name: body.name }),
            ...(body.image && { image: body.image }),
            ...(body.publicId && { publicId: body.publicId }),
        },
    });
};
// Delete Category
const deleteCategory = async (id, user) => {
    if (user.role === Role.CUSTOMER) {
        throw new Error("Forbidden: Only admins can delete categories");
    }
    return await prisma.category.delete({
        where: { id: id },
    });
};
export const categoryService = {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategory,
};
