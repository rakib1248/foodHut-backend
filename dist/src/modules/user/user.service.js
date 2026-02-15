import { Role } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
const getUserRoleBase = async (paylode) => {
    if (paylode.role === Role.PROVIDER) {
        const user = await prisma.user.findUnique({
            where: { id: paylode.id },
            include: { providerProfile: true },
        });
        return user;
    }
    if (paylode.role === Role.CUSTOMER) {
        const user = await prisma.user.findMany({
            where: { role: Role.PROVIDER },
            include: {
                providerProfile: {
                    include: { meals: true },
                },
            },
        });
        return user;
    }
    const user = await prisma.user.findMany({
        include: { providerProfile: true },
    });
    return user;
};
const updateUser = async (id, payload, requester) => {
    if (requester.id === id) {
        return await prisma.user.update({
            where: { id: id },
            data: { name: payload.name },
        });
    }
    if (requester.role === Role.ADMIN) {
        return await prisma.user.update({
            where: { id: id },
            data: { status: payload.status },
        });
    }
    throw new Error("Unauthorized to update this user!");
};
export const userService = {
    getUserRoleBase,
    updateUser,
};
