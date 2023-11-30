import Review from "../models/review.model.js";
import Product from "../models/product.model.js";
import Shop from "../models/shop.model.js";
import Order from "../models/order.model.js";

export const createReview = async (req, res) => {
  try { 

    const userId = req.keyStore.user;
    const orderId = req.orderId;

    const { reviews } = req.body;

    reviews.forEach(async (review) => {
      const { product, content, rating } = review;

      const newReview = await Review.create({
        product,
        content,
        rating,
        user: userId,
      });
  
      // Update product reviews
      const updateProduct = await Product.findById(product).lean();
      console.log(updateProduct);
      const newRating =
        ((updateProduct.rating * updateProduct.reviews.length + rating) /
        (updateProduct.reviews.length + 1)).toFixed(1);
      await Product.findByIdAndUpdate(product, {
        $set: {
          rating: newRating,
        },
        $push: {
          reviews: newReview._id,
        },
      });
  
      // Update shop reviews 
      await Shop.findByIdAndUpdate(userId, {
        $push: {
          reviews: newReview._id,
        },
      });
    });

    await Order.findByIdAndUpdate(orderId, {
      $set: {
        reviewed: true,
      },
    });


    return res.status(201).json({ success: true, data: reviews });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};

export const createOneReview = async (req, res) => {
  try {
    const userId = req.keyStore.user;
    const orderId = req.orderId;

    const { product, content, rating } = req.body;

    const newReview = await Review.create({
      product,
      content,
      rating,
      user: userId,
    });

    // Update product reviews
    const updateProduct = await Product.findById(product).lean();
    const newRating =
      (updateProduct.rating * updateProduct.reviews.length + rating) /
      (updateProduct.reviews.length + 1);
    await Product.findByIdAndUpdate(product, {
      $set: {
        rating: newRating,
      },
      $push: {
        reviews: newReview._id,
      },
    });

    // Update shop reviews 
    await Shop.findByIdAndUpdate(userId, {
      $push: {
        reviews: newReview._id,
      },
    });

    await Order.findByIdAndUpdate(orderId, {
      $set: {
        reviewed: true,
      },
    });

    return res.status(201).json({ success: true, data: newReview });
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Đã có lỗi xảy ra, vui lòng thử lại sau!",
        error: error,
      });
  }
};
