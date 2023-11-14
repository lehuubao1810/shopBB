import Product from "../models/product.model.js";
import Category from "../models/category.model.js";

export const createProduct = async (req, res) => {
  // check slug exist

  const slugExist = await Product.findOne({ slug: req.body.slug });
  if (slugExist) {
    return res.status(400).json({ success: false, error: "Slug existed" });
  }

  const newProduct = await Product.create(req.body);
  if (!newProduct) {
    return res.status(400).json({ success: false, error: err });
  }

  // add product to category

  const addToCategory = await Category.findByIdAndUpdate(newProduct.category, {
    $push: { products: newProduct._id },
  });
  if (!addToCategory) {
    return res.status(400).json({ success: false, error: err });
  }

  return res.status(201).json({ success: true, data: newProduct });
};

export const createProducts = async (req, res) => {

  // check slug exist
  const slugs = req.body.map((product) => product.slug);

  for (let i=0; i<slugs.length; i++) {
    const existed = slugs.filter((slug) => slug === slugs[i])
    if (existed.length > 1) {
      return res.status(400).json({ success: false, error: "Slug existed in input" });
    }
  }

  const slugExist = await Product.find({ slug: { $in: slugs } });
  if (slugExist.length > 0) {
    return res.status(400).json({ success: false, error: "Slug existed in dbs" });
  }  

  const newProducts = await Product.insertMany(req.body);
  if (!newProducts) {
    return res.status(400).json({ success: false, error: err });
  }
  return res.status(201).json({ success: true, data: newProducts });
};

export const getProductsByCategory = async (req, res) => {
  try {
    const categorySlug = req.params.slug;
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 8;
    const sortPrice = req.query.sortPrice || "asc"; // asc | desc

    // Bộ lọc
    const filter = {};

    // Nếu bạn muốn áp dụng bộ lọc theo tên sản phẩm, ví dụ: /api/categories/:categorySlug/products?name=Product1
    // if (req.query.name) {
    //   filter.name = { $regex: new RegExp(req.query.name, 'i') }; // Tìm kiếm không phân biệt hoa thường
    // }

    // Nếu bạn muốn áp dụng bộ lọc theo giá, ví dụ: /api/categories/:categorySlug/products?minPrice=20&maxPrice=50
    if (req.query.minPrice && req.query.maxPrice) {
      filter.price = {
        $gte: parseFloat(req.query.minPrice),
        $lte: parseFloat(req.query.maxPrice),
      };
    }
    const category = await Category.findOne({ slug: categorySlug }).lean();

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.attributes.forEach(async (attribute) => {
      if (req.query[attribute.slug]) {
        filter[`attributes.${attribute.slug}`] = req.query[attribute.slug];
        // exp: filter['attributes.brand'] = 'Apple'
        // api/categories/laptop/products?brand=Apple
      }
    });

    const totalProducts = await Product.countDocuments({
      category: category._id,
      ...filter,
    });

    const products = await Product.find({ category: category._id, ...filter })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ price: sortPrice })
      // .populate('category') // Populate để lấy thông tin danh mục
      .lean();

    res.json({
      category: category.name,
      products,
      totalProducts,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / perPage),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProduct = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug }).lean();
  if (!product) {
    return res.status(400).json({ success: false, error: err });
  }
  return res.status(200).json({ success: true, data: product });
};

export const deleteProduct = async (req, res) => {
  const deleteProduct = await Product.findByIdAndDelete(req.params.id).lean();

  // remove product from category
  const removeProductFromCategory = await Category.findByIdAndUpdate(
    deleteProduct.category,
    {
      $pull: { products: deleteProduct._id },
    }
  );

  if (!deleteProduct) {
    return res.status(400).json({ success: false, error: err });
  }
  return res.status(200).json({ success: true, data: deleteProduct });
};
