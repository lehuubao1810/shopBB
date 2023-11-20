import Order from "../models/order.model.js";

export const checkOrderDelivered = async (req, res, next) => {
    try {
        const { id } = req.headers["order-id"];
        const order = await Order.findById(id);
        if (!order) {
            return res.status(400).json({ success: false, error: "Order not found" });
        }
        if (order.status !== "delivered") {
            return res.status(400).json({ success: false, error: "Order not completed" });
        }
        req.orderId = order._id;
        return next();
    } catch (error) {
        return res.status(400).json({ success: false, error: error });
    }
};