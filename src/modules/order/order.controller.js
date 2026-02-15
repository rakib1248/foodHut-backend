import { orderService } from "./order.service";
const createOrder = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ ok: false, message: "Unauthorized" });
        }
        const order = await orderService.createOrder(req.user.id, req.body.address);
        res
            .status(201)
            .json({ ok: true, data: order, message: "order complete successfully" });
    }
    catch (err) {
        next(err);
    }
};
const getrders = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ ok: false, message: "Unauthorized" });
        }
        const order = await orderService.getOrders(req.user);
        res
            .status(201)
            .json({ ok: true, data: order, message: "get Order successfully" });
    }
    catch (err) {
        next(err);
    }
};
const cancelOrderByCustomer = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ ok: false, message: "Unauthorized" });
        }
        const order = await orderService.cancelOrderByCustomer(req.params.orderId, req.user.id);
        res
            .status(201)
            .json({ ok: true, data: order, message: "order Calcell successfully" });
    }
    catch (err) {
        next(err);
    }
};
const updateOrderStatusByProvider = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ ok: false, message: "Unauthorized" });
        }
        const order = await orderService.updateOrderStatusByProvider(req.params.orderId, req.body.status, req.user.id);
        res.status(201).json({
            ok: true,
            data: order,
            message: "order status update successfully",
        });
    }
    catch (err) {
        next(err);
    }
};
export const orderController = {
    createOrder,
    getrders,
    cancelOrderByCustomer,
    updateOrderStatusByProvider,
};
