import mongoose from "mongoose";

const DOCUMENT_NAME = "Category"; 
const COLLECTION_NAME = "Categories";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    thumb: {
      type: String, 
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    attributes: [
      {
        name: {
          type: String,
          required: true,
        },
        options: {
          type: [String],
          required: true,
        },
        slug: {
          type: String,
          required: true,
        },
      },
    ],
    products: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      // default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: COLLECTION_NAME,
  }
);

const Category = mongoose.model(DOCUMENT_NAME, categorySchema);

export default Category;
