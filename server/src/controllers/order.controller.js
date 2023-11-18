import Order from "../models/order.model.js";
import Client from "../models/client.model.js";

export const createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    if (!newOrder) {
      return res.status(400).json({ success: false, error: err });
    }
    return res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().lean();
    if (!orders) {
      return res.status(400).json({ success: false, error: err });
    }
    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).lean();
    if (!order) {
      return res.status(400).json({ success: false, error: err });
    }
    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};

export const getOrderByEmail = async (req, res) => {
  try {
    const client = await Client.findOne({ email: req.params.email }).lean();
    if (!client) {
      return res.status(400).json({ success: false, error: err });
    }
    console.log(client.otp, req.params.otp);
    if (client.otp != req.params.otp) {
      return res
        .status(400)
        .json({ success: false, error: "otp không chính xác" });
    }
    // return res.status(200).json({ success: true, data: client });
    const orders = await Order.find({ email: req.params.email });
    if (orders.length === 0) {
      return res.status(400).json({ success: false, error: "Loi" });
    }
    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const deleteOrder = await Order.findByIdAndDelete(req.params.id).lean();
    if (!deleteOrder) {
      return res.status(400).json({ success: false, error: err });
    }
    return res.status(200).json({ success: true, data: deleteOrder });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};
