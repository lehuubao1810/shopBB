import mongoose from "mongoose";

const DOCUMENT_NAME = "ApiKey";
const COLLECTION_NAME = "ApiKeys";

const apiKeySchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean, 
        default: true,
    },
    permission: {
        type: String, 
        enum: ["read", "write"],
        default: "read",
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
    versionKey: false,
});

const ApiKey = mongoose.model(DOCUMENT_NAME, apiKeySchema);

export default ApiKey;