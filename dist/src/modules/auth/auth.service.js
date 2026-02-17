import { prisma } from "../../lib/prisma.js";
const getUserById = async (id) => {
    const user = await prisma.user.findUnique({
        where: { id },
        include: { providerProfile: true },
    });
    return user;
};
export const authService = {
    getUserById,
};
//# sourceMappingURL=auth.service.js.map