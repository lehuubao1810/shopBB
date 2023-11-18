import mongoose, { Schema } from "mongoose";

const DOCUMENT_NAME = "Client";
const COLLECTION_NAME = "Clients";

const clientSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: { 
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});

const Client = mongoose.model(DOCUMENT_NAME, clientSchema);

export default Client;