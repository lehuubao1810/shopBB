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
    // verify: {
    //     type: Schema.Types.Boolean,
    //     default: false,
    // },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});

const Shop = mongoose.model(DOCUMENT_NAME, shopSchema);

export default Shop;