import { Role } from "../../../generated/prisma/enums.js";
import { prisma } from "../../lib/prisma.js";
// create provider Profile
const createProvider = async (user, body) => {
    if (user.role !== Role.PROVIDER) {
        throw new Error("Forbidden: Only Provider can create profile");
    }
    const { businessName, description, address, phone } = body;
    return await prisma.providerProfile.create({
        data: {
            businessName, // এখানে ভ্যালু না থাকলে Prisma এরর দিবে
            description,
            address,
            phone,
            userId: user.id,
        },
    });
};
// get Provider
const getProvider = async () => {
    return await prisma.providerProfile.findMany({
        include: { user: true, meals: true },
    });
};
// get single Provider and meals
const getProviderById = async (id) => {
    return await prisma.providerProfile.findUnique({
        where: { id },
        include: { meals: true, user: true },
    });
};
export const providerService = {
    createProvider,
    getProvider,
    getProviderById,
};
//# sourceMappingURL=provider.service.js.map