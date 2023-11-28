import Shop from "../models/shop.model.js";

export const getOrders = async (req, res) => {
  //   try {
  const userId = req.keyStore.user;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skipIndex = (page - 1) * limit;

  const status = req.query.status;

  const orders = await Shop.find({
    _id: userId,
  })
    .populate({
      path: "orders",
      populate: {
        path: "products",
        populate: {
          path: "product",
          //   select: "name price images",
        },
      },
    })
    .select("orders")
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

  console.log(status);

  if (status) {
    const filterOrders = orders[0].orders
      .filter((order) => order.status === status)
      .sort((a, b) => {
        return b.createdAt - a.createdAt;
      })

    const resultOrder = filterOrders.slice(skipIndex, skipIndex + limit);
    return res.status(200).json({
      success: true,
      metadata: {
        page: page,
        limit: limit,
        total: filterOrders.length,
        totalPages: Math.ceil(filterOrders.length / limit),
        orders: resultOrder,
      },
    });
  }

  const resultOrder = orders[0].orders
  .sort((a, b) => {
    return b.createdAt - a.createdAt;
  })
  .slice(skipIndex, skipIndex + limit);

  return res.status(200).json({
    success: true,
    metadata: {
      page: page,
      limit: limit,
      total: orders[0].orders.length,
      totalPages: Math.ceil(orders[0].orders.length / limit),
      orders: resultOrder,
    },
  });
  //   } catch (error) {
  //     return res.status(400).json({
  //       success: false,
  //       error: {
  //         message: "Lỗi không xác định",
  //         status: 400,
  //         error: error,
  //       },
  //     });
  //   }
};


export const updateInfo = async (req, res) => {
  try {
    const userId = req.keyStore.user;
    const { name, phone, address } = req.body;

    const shop = await Shop.findOneAndUpdate(
      { _id: userId },
      { name, phone, address },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: {
        shop: shop,
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

export const getShop = async (req, res) => {
  try {
    const shops = await Shop.find({
      role: "Customer",
    }).lean();
    if (!shops) {
      return res.status(400).json({ success: false, error: "err get shops" });
    }
    return res.status(200).json({ success: true, data: shops });
    
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