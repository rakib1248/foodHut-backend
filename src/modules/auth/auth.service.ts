import { prisma } from "../../lib/prisma";

const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: { providerProfile: true},
  });

  return user;
};

export const authService = {
  getUserById,
};
