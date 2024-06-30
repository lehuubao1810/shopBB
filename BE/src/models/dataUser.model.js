import mongoose from "mongoose";

const DOCUMENT_NAME = "DataUser";
const COLLECTION_NAME = "DataUsers";

const dataUserSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        searchs: [
            {
                text: {
                    type: String,
                    required: true,
                },
                times: {
                    type: Number,
                    required: true,
                },
            }
        ],
        cart: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    default: null,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            }
        ],
        orders: [
            {
                order: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Order",
                    default: null,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            }
        ],
    },{
        timestamps: true,
        versionKey: false,
        collection: COLLECTION_NAME,
    }
);

const DataUser = mongoose.model(DOCUMENT_NAME, dataUserSchema);

export default DataUser;