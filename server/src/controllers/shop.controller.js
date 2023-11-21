import Shop from "../models/shop.model.js";

export const getOrders = async (req, res) => {
  //   try {
  const userId = req.keyStore.user;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
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

  const resultOrders = orders[0].orders
    .slice(skipIndex, skipIndex + limit)
    .sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
  console.log(status);
  let filterOrders = [];
  if (status) {
    filterOrders = resultOrders.filter((order) => {
      return order.status === status;
    });
  }

  return res.status(200).json({
    success: true,
    metadata: {
      page: page,
      limit: limit,
      total: orders[0].orders.length,
      orders: filterOrders.length > 0 ? filterOrders : resultOrders,
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
