import mongoose, { Schema } from "mongoose";

const DOCUMENT_NAME = "Shop";
const COLLECTION_NAME = "Shops";

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    phone: {
        type: String,
        default: null,
    },
    address: {
        type: String,
        default: null,
    },
    // status: {
    //     type: String,
    //     enum: ["Pending", "Active"],
    //     default: "Pending",
    // },
    role: {
        type: String,
        enum: ["Admin", "Seller","Customer"],
        default: "Customer",
    },
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order",
        },
    ],
    cart: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                default: null,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
        },
    ],
    // resetPasswordToken: {
    //     type: String,
    // },
    // verify: {
    //     type: Schema.Types.Boolean,
    //     default: false,
    // },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});

const Shop = mongoose.model(DOCUMENT_NAME, shopSchema);

export default Shop;