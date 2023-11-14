import Category from "../models/category.model.js";
import Product from "../models/product.model.js";

export const createCategory = async (req, res) => {
  const newCategory = await Category.create(req.body);
  if (!newCategory) {
    return res.status(400).json({ success: false, error: err });
  }
  return res.status(201).json({ success: true, data: newCategory });
};

export const getCategories = async (req, res) => {
  const categories = await Category.find().lean();
  if (!categories) {
    return res.status(400).json({ success: false, error: err });
  }
  return res.status(200).json({ success: true, data: categories });
};


export const getCategory = async (req, res) => {
    const category = await Category.findById(req.params.id).lean();
    if (!category) {
        return res.status(400).json({ success: false, error: err });
    }
    return res.status(200).json({ success: true, data: category });
};

export const getCategoryBySlug = async (req, res) => {
    const category = await Category.findOne({slug: req.params.slug}).lean();
    if (!category) {
        return res.status(400).json({ success: false, error: err });
    }
    return res.status(200).json({ success: true, data: category });
};

export const updateCategory = async (req, res) => {
  const updateCategory = await Category.findByIdAndUpdate(req.body.categoryId, {
     
  })
};

export const deleteCategory = async (req, res) => {
    const deleteCategory = await Category.findByIdAndDelete(req.params.id).lean();
    if (!deleteCategory) {
        return res.status(400).json({ success: false, error: err });
    }

    // change category of products to null
    const products = await Product.find({category: req.params.id}).lean();

    products.forEach(async (product) => {
      await Product.findByIdAndUpdate(product._id, {category: null});
    });

    return res.status(200).json({ success: true, data: deleteCategory });
};