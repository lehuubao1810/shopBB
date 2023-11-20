import Review from "../models/review.model.js";
import Product from "../models/product.model.js";
import Shop from "../models/shop.model.js";
import Order from "../models/order.model.js";

export const createReview = async (req, res) => {
    try {
        const { content, rating } = req.body;
        const { id } = req.params;
        const { userId } = req.KeyStore.user

        const product = await Product.findById(id);
        if (!product) {
            return res.status(400).json({ success: false, error: "Product not found" });
        }

        const newReview = await Review.create({
            content,
            rating,
            user: userId,
            product: id,
        });

        if (!newReview) {
            return res.status(400).json({ success: false, error: "Something went wrong" });
        }

        await Product.findByIdAndUpdate(id, {
            $push: { reviews: newReview._id },
        });

        await Shop.findByIdAndUpdate(req.userId, {
            $push: { reviews: newReview._id },
        });

        await Order.findByIdAndUpdate(req.orderId, {
            $set: {
                reviewed: true,
            }
        });

        return res.status(201).json({ success: true, data: newReview });
        
    } catch (error) {
        return res.status(400).json({ success: false, error: error });
    }
};