import { User, Role, Meal } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createOrder = async (
  user: User,
  payload: {
    address: string;
    items: { mealId: string; quantity: number }[];
  },
) => {
  // 1️⃣ role check
  if (user.role !== Role.CUSTOMER) {
    throw new Error("Only customers can place orders");
  }

  if (!payload.items.length) {
    throw new Error("Order items cannot be empty");
  }

  // // 2️⃣ meals fetch
  // const meals = await Prisma.meal.findMan({
  //   where: {
  //     id: { in: payload.items.map((i) => i.mealId) },
  //     isAvailable: true,
  //   },
  // });
  const meals = await prisma.meal.findMany({
    where: {
      id: { in: payload.items.map((i) => i.mealId) },
      isAvailable: true,
    },
  });

  if (meals.length !== payload.items.length) {
    throw new Error("Some meals are unavailable");
  }

  // 3️⃣ price calculation
  let totalAmount = 0;

  const orderItems = payload.items.map((item) => {
    const meal: Meal = meals.find((m: Meal) => m.id === item.mealId)!;
    const price = meal.price * item.quantity;
    totalAmount += price;

    return {
      mealId: meal.id,
      quantity: item.quantity,
      price: meal.price,
    };
  });

  // 4️⃣ create order + items (transaction)
  const order = await prisma.order.create({
    data: {
      address: payload.address,
      totalAmount,
      customerId: user.id,
      items: {
        create: orderItems,
      },
    },
    include: {
      items: true,
    },
  });

  return order;
};

export const orderService = {
  createOrder
}
