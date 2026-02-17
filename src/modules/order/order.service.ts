import {  User } from "../../../generated/prisma/client.js";
import { OrderStatus, Role } from "../../../generated/prisma/enums.js";
import { prisma } from "../../lib/prisma.js";

// const createOrder = async (userId: string, address: string) => {

//   const cart = await prisma.cart.findUnique({
//     where: { userId },
//     include: {
//       items: {
//         include: { meal: true },
//       },
//     },
//   });

//   if (!cart || cart.items.length === 0) {
//     throw new Error("Your cart is empty!");
//   }

//   const totalAmount = cart.items.reduce(
//     (acc, item) => acc + item.meal.price * item.quantity,
//     0,
//   );

//   const providerId = cart.items[0].meal.providerId;

//   return await prisma.$transaction(async (tx) => {
//     const newOrder = await tx.order.create({
//       data: {
//         totalAmount,
//         address,

//         customerId: userId,
//         providerId: providerId,
//       },
//     });

//     const orderItemsData = cart.items.map((item) => ({
//       orderId: newOrder.id,
//       mealId: item.mealId,
//       quantity: item.quantity,
//       price: item.meal.price,
//     }));

//     await tx.orderItem.createMany({
//       data: orderItemsData,
//     });

//     await tx.cartItem.deleteMany({
//       where: { cartId: cart.id },
//     });

//     return newOrder;
//   });
// };

const createOrder = async (userId: string, address: string) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: { include: { meal: true } },
    },
  });

  if (!cart || cart.items.length === 0) {
    throw new Error("Your cart is empty!");
  }


  const itemsByProvider: Record<string, typeof cart.items> = {};

  cart.items.forEach((item : any) => {
    const pId = item.meal.providerId;
    if (!itemsByProvider[pId]) {
      itemsByProvider[pId] = [];
    }
    itemsByProvider[pId].push(item);
  });


  return await prisma.$transaction(async (tx: any) => {
    const createdOrders = [];

    
    for (const [pId, items] of Object.entries(itemsByProvider)) {
      const totalAmount = items.reduce(
        (acc : any, item: any) => acc + item.meal.price * item.quantity,
        0,
      );

    
      const newOrder = await tx.order.create({
        data: {
          totalAmount,
          address,
          customerId: userId,
          providerId: pId, 
        },
      });

      
      const orderItemsData = items.map((item:any) => ({
        orderId: newOrder.id,
        mealId: item.mealId,
        quantity: item.quantity,
        price: item.meal.price,
      }));

      await tx.orderItem.createMany({
        data: orderItemsData,
      });

      createdOrders.push(newOrder);
    }


    await tx.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return createdOrders; 
  });
};



const getOrders = async (user: User) => {
  if (user.role === Role.ADMIN) {
    return await prisma.order.findMany({
      include: {
        items: { include: { meal: { include: { reviews: true } } } },
        customer: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  if (user.role === Role.CUSTOMER) {
    return await prisma.order.findMany({
      where: { customerId: user.id },
      include: {
        items: { include: { meal: { include: { reviews: true } } } },
        customer: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }


  const provider = await prisma.providerProfile.findUnique({
    where: { userId: user.id },
  });

  if (!provider) throw new Error("Provider profile not found!");

  return await prisma.order.findMany({
    where: { providerId: provider.id },
    include: {
      items: { include: { meal: { include: { reviews: true } } } },
      customer: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

const cancelOrderByCustomer = async (orderId: string, userId: string) => {
  const order = await prisma.order.findUnique({ where: { id: orderId } });

  if (!order || order.customerId !== userId) {
    throw new Error("Order not found or unauthorized.");
  }

 
  if (order.status === OrderStatus.DELIVERED) {
    throw new Error(
      "Cannot cancel order after it has been accepted or prepared.",
    );
  }

  return await prisma.order.update({
    where: { id: orderId },
    data: { status: OrderStatus.CANCELLED }, 
  });
};

const updateOrderStatusByProvider = async (
  orderId: string,
  status: OrderStatus,
  userId: string,
) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  const order = await prisma.order.findUnique({ where: { id: orderId } });

  if (!order || !provider || order.providerId !== provider.id) {
    throw new Error("Unauthorized: You can only update your own orders.");
  }

  if (order.status === OrderStatus.CANCELLED) {
    throw new Error(
      "Cannot change order status after it has been cancelled or prepared.",
    );
  }

  return await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
};

export const orderService = {
  createOrder,
  getOrders,
  cancelOrderByCustomer,
  updateOrderStatusByProvider,
};
