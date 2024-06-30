import mongoose from 'mongoose';

const DOCUMENT_NAME = 'Review';
const COLLECTION_NAME = 'Reviews';

const reviewSchema = new mongoose.Schema(
    {
        content: {
        type: String,
        required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            default: null,
        },
    },
    {
        timestamps: true,
        versionKey: false,
        collection: COLLECTION_NAME,
    }
);

const Review = mongoose.model(DOCUMENT_NAME, reviewSchema);

export default Review;