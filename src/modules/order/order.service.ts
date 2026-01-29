import { Role, User } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createOrder = async (userId: string, address: string) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: { meal: true },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    throw new Error("Your cart is empty!");
  }

  const totalAmount = cart.items.reduce(
    (acc, item) => acc + item.meal.price * item.quantity,
    0,
  );

  const providerId = cart.items[0].meal.providerId;

  return await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        totalAmount,
        address,

        customerId: userId,
        providerId: providerId,
      },
    });

    const orderItemsData = cart.items.map((item) => ({
      orderId: newOrder.id,
      mealId: item.mealId,
      quantity: item.quantity,
      price: item.meal.price,
    }));

    await tx.orderItem.createMany({
      data: orderItemsData,
    });

    await tx.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return newOrder;
  });
};

const getOrders = async (user: User) => {
  if (user.role === Role.ADMIN) {
    return await prisma.order.findMany({
      include: {
        items: { include: { meal: true } },
        customer: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  if (user.role === Role.CUSTOMER) {
    return await prisma.order.findMany({
      where: { customerId: user.id },
      include: {
        items: { include: { meal: true } },
        customer: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  // Prothome provider-er profile theke tar ID nite hobe
  const provider = await prisma.providerProfile.findUnique({
    where: { userId: user.id },
  });

  if (!provider) throw new Error("Provider profile not found!");

  return await prisma.order.findMany({
    where: { providerId: provider.id },
    include: {
      items: { include: { meal: true } },
      customer: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const orderService = {
  createOrder,
  getOrders,
};
