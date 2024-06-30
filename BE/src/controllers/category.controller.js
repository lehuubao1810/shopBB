import Category from "../models/category.model.js";
import Product from "../models/product.model.js";

export const createCategory = async (req, res) => {
  try {
    const existedCategory = await Category.findOne({ slug: req.body.slug });
    if (existedCategory) {
      return res.status(400).json({ success: false, error: "Đã tồn tại slug" });
    }

    const newCategory = await Category.create(req.body);
    if (!newCategory) {
      return res.status(400).json({ success: false, error: "err" });
    }
    return res.status(201).json({ success: true, data: newCategory });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().lean();
    if (!categories) {
      return res.status(400).json({ success: false, error: "err" });
    }
    return res.status(200).json({ success: true, data: categories });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).lean();
    if (!category) {
      return res.status(400).json({ success: false, error: "err" });
    }
    return res.status(200).json({ success: true, data: category });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};

export const getCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug }).lean();
    if (!category) {
      return res.status(400).json({ success: false, error: "err" });
    }
    return res.status(200).json({ success: true, data: category });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).lean();

    // check if slug is existed, if existed, check if slug is the same as before
    const existedCategory = await Category.findOne({ slug: req.body.slug });
    if (existedCategory && existedCategory.slug !== category.slug) {
      return res.status(400).json({ success: false, error: "Đã tồn tại slug" });
    }

    const updateCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        slug: req.body.slug,
        thumb: req.body.thumb,
        attributes: req.body.attributes,
      },
      { new: true }
    ).lean();
    if (!updateCategory) {
      return res.status(400).json({ success: false, error: "err" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const deleteCategory = await Category.findByIdAndDelete(
      req.params.id
    ).lean();
    if (!deleteCategory) {
      return res.status(400).json({ success: false, error: "err" });
    }

    // change category of products to null
    const products = await Product.find({ category: req.params.id }).lean();

    products.forEach(async (product) => {
      await Product.findByIdAndUpdate(product._id, { category: null });
    });

    return res.status(200).json({ success: true, data: deleteCategory });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};
