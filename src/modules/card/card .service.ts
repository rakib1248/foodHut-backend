import { prisma } from "../../lib/prisma";

const addToCart = async (
  userId: string,
  mealId: string,
  quantity: number = 1,
) => {
  let cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
    });
  }

  const existingCartItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      mealId: mealId,
    },
  });

  if (existingCartItem) {
    return await prisma.cartItem.update({
      where: { id: existingCartItem.id },
      data: {
        quantity: existingCartItem.quantity + quantity,
      },
    });
  } else {
    return await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        mealId: mealId,
        quantity: quantity,
      },
    });
  }
};

const getCartItem = async (userId: string) => {
  const cardItem = await prisma.cart.findMany({
    where: { userId },
    include: { items: true },
  });

  if (!cardItem) {
    throw new Error("Your Cart Is Empty");
  }

  return cardItem;
};

export const cartService = {
  addToCart,
  getCartItem,
};
