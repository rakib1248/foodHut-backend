import { ProviderProfile, User } from "../../../generated/prisma/client";
import { Role } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

// create provider Profile
const createProvider = async (user: User, body: ProviderProfile) => {
  if (user.role !== Role.PROVIDER) {
    throw new Error("Forbidden: Only Provider can create profile");
  }

  return await prisma.providerProfile.create({
    data: {
      ...body,
      userId: user.id,
    },
  });
};

export const providerService = {
  createProvider,
};
