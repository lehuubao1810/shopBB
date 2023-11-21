import Order from "../models/order.model.js";

export const checkOrderDelivered = async (req, res, next) => {
  try {
    const id = req.headers["order-id"];
    const userId = req.keyStore.user;
    const order = await Order.findById(id).lean();
    if (!order) {
      return res.status(400).json({ success: false, error: "Order not found" });
    }
    if (order.customer.customer_id.toString() != userId) {
      return res
        .status(400)
        .json({
          success: false,
          error: "You are not allowed to review this order",
        });
    }
    if (order.reviewed) {
      return res
        .status(400)
        .json({ success: false, error: "This order has been reviewed" });
    }
    req.orderId = order._id;
    return next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Đã có lỗi xảy ra ở order util, vui lòng thử lại sau!",
      error: error,
    });
  }
};
