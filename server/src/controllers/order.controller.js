import mongoose from "mongoose";

import Order from "../models/order.model.js";
import Client from "../models/client.model.js";
import Shop from "../models/shop.model.js";

export const createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    if (!newOrder) {
      return res.status(400).json({ success: false, error: err });
    }

    if (newOrder.customer.customer_id != null) {
      await Shop.findByIdAndUpdate(newOrder.customer.customer_id, {
        $push: { orders: newOrder._id },
      });
    }

    return res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};

export const getOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skipIndex = (page - 1) * limit;

    const filter = {};
    const status = req.query.status;

    if (status) {
      filter.status = status;
    }

    // sort by createdAt
    const sort = {
      createdAt: -1,
    };

    const orders = await Order.find({
      "customer.customer_id": req.keyStore.user,
      ...filter,
    })
      .sort(sort)
      .skip(skipIndex)
      .limit(limit)
      .populate("products.product")
      .lean();

    if (!orders) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Không có đơn hàng nào",
          status: 400,
        },
      });
    }
    return res.status(200).json({
      success: true,
      metadata: {
        page: page,
        limit: limit,
        total: orders.length,
        orders: orders,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: {
        message: "Lỗi không xác định",
        status: 400,
        error: error,
      },
    });
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

export const updateOrder = async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).lean();
    if (!updateOrder) {
      return res.status(400).json({ success: false, error: err });
    }
    return res.status(200).json({ success: true, data: updateOrder });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};

export const updateStatusOrder = async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      {
        new: true,
      }
    ).lean();
    if (!updateOrder) {
      return res.status(400).json({ success: false, error: err });
    }
    return res.status(200).json({ success: true, data: updateOrder });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      {
        new: true,
      }
    ).lean();
    if (!updateOrder) {
      return res.status(400).json({ success: false, error: err });
    }
    return res.status(200).json({ success: true, data: updateOrder });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};
