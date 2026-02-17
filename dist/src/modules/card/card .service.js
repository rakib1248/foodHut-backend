import { prisma } from "../../lib/prisma.js";
const addToCart = async (userId, mealId, quantity = 1) => {
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
    }
    else {
        return await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                mealId: mealId,
                quantity: quantity,
            },
        });
    }
};
const getCartItem = async (userId) => {
    const cardItem = await prisma.cart.findUnique({
        where: { userId },
        include: {
            items: {
                include: { meal: true },
            },
        },
    });
    if (!cardItem) {
        return { items: [] };
    }
    return cardItem;
};
// ৩. কোয়ান্টিটি আপডেট করা (NEW)
const updateCartItemQuantity = async (userId, cartItemId, quantity) => {
    // ভ্যালিডেশন: কোয়ান্টিটি ১ এর নিচে হতে পারবে না
    if (quantity < 1) {
        throw new Error("Quantity must be at least 1");
    }
    // সিকিউরিটি চেক: এই আইটেমটি কি আসলেই এই ইউজারের কার্ডের?
    // এটা না করলে অন্য ইউজার আইডি জেনে আপনার কার্ড আপডেট করে দিতে পারে।
    const cartItem = await prisma.cartItem.findFirst({
        where: {
            id: cartItemId,
            cart: {
                userId: userId,
            },
        },
    });
    if (!cartItem) {
        throw new Error("Cart item not found or unauthorized");
    }
    // আপডেট করা
    return await prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity: quantity },
        include: { meal: true }, // আপডেটেড ডাটা সাথে মিল ইনফো রিটার্ন করলাম
    });
};
const removeCartItem = async (userId, cartItemId) => {
    // সিকিউরিটি চেক
    const cartItem = await prisma.cartItem.findFirst({
        where: {
            id: cartItemId,
            cart: {
                userId: userId,
            },
        },
    });
    if (!cartItem) {
        throw new Error("Cart item not found or unauthorized");
    }
    // ডিলিট করা
    return await prisma.cartItem.delete({
        where: { id: cartItemId },
    });
};
export const cartService = {
    addToCart,
    getCartItem,
    updateCartItemQuantity,
    removeCartItem,
};
//# sourceMappingURL=card%20.service.js.map