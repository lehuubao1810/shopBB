import Product from "../models/product.model.js";
import Category from "../models/category.model.js";

export const createProduct = async (req, res) => {
  try {
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

    const addToCategory = await Category.findByIdAndUpdate(
      newProduct.category,
      {
        $push: { products: newProduct._id },
      }
    );
    if (!addToCategory) {
      return res.status(400).json({ success: false, error: err });
    }

    return res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};

export const createProducts = async (req, res) => {
  try {
  // check slug exist
  const slugs = req.body.map((product) => product.slug);

  for (let i = 0; i < slugs.length; i++) {
    const existed = slugs.filter((slug) => slug === slugs[i]);
    if (existed.length > 1) {
      return res
        .status(400)
        .json({ success: false, error: "Slug existed in input" });
    }
  }

  const slugExist = await Product.find({ slug: { $in: slugs } });
  if (slugExist.length > 0) {
    return res
      .status(400)
      .json({ success: false, error: "Slug existed in dbs" });
  }

  const newProducts = await Product.insertMany(req.body);
  if (!newProducts) {
    return res.status(400).json({ success: false, error: err });
  }

  // add product to category
  newProducts.forEach(async (product) => {
    const addToCategory = await Category.findByIdAndUpdate(
      product.category,
      {
        $push: { products: product._id },
      }
    );
    if (!addToCategory) {
      return res.status(400).json({ success: false, error: err });
    }
  });

  return res.status(201).json({ success: true, data: newProducts });
  } catch (error) {
    return res.status(400).json({ success: false, txt: "catch", error: error });
  }
};
export const getProducts = async (req, res) => {
  try {
    const categorySlug = req.params.slug;
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 8;
    const sortSold = req.query.sortSold || "desc"; // asc | desc

    // Bộ lọc
    const filter = {};

    // Nếu bạn muốn áp dụng bộ lọc theo giá, ví dụ: /api/categories/:categorySlug/products?minPrice=20&maxPrice=50
    if (req.query.minPrice && req.query.maxPrice) {
      filter.price = {
        $gte: parseFloat(req.query.minPrice),
        $lte: parseFloat(req.query.maxPrice),
      };
    }

    const totalProducts = await Product.countDocuments({
      ...filter,
    });

    const products = await Product.find({ ...filter })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ sold: sortSold })
      // .populate('category') // Populate để lấy thông tin danh mục
      .lean();

    res.json({
      products,
      totalProducts,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / perPage),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductsByCategorySlug = async (req, res) => {
  try {
    const categorySlug = req.params.slug;
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 8;
    const sortPrice = req.query.sortPrice || "asc"; // asc | desc

    // Bộ lọc
    const filter = {};

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

export const getProductsByCategoryId = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 8;
    const sortPrice = req.query.sortPrice || "asc"; // asc | desc

    // Bộ lọc
    const filter = {};

    // Nếu bạn muốn áp dụng bộ lọc theo giá, ví dụ: /api/categories/:categorySlug/products?minPrice=20&maxPrice=50
    if (req.query.minPrice && req.query.maxPrice) {
      filter.price = {
        $gte: parseFloat(req.query.minPrice),
        $lte: parseFloat(req.query.maxPrice),
      };
    }
    const category = await Category.findById(categoryId).lean();

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

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(400).json({ success: false, error: "err get product" });
    }
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate("reviews")
      .lean();
    if (!product) {
      return res.status(400).json({ success: false, error: "err get product" });
    }
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id).lean();
    if (!deleteProduct) {
      return res.status(400).json({ success: false, error: err });
    }
    // remove product from category
    const removeProductFromCategory = await Category.findByIdAndUpdate(
      deleteProduct.category,
      {
        $pull: { products: deleteProduct._id },
      }
    );
    if (!removeProductFromCategory) {
      return res.status(400).json({ success: false, error: err });
    }

    return res.status(200).json({ success: true, data: deleteProduct });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};

export const searchProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 8;
    const sortPrice = req.query.sortPrice || "asc"; // asc | desc

    // Bộ lọc
    const filter = {};

    // Nếu bạn muốn áp dụng bộ lọc theo giá, ví dụ: /api/categories/:categorySlug/products?minPrice=20&maxPrice=50
    if (req.query.minPrice && req.query.maxPrice) {
      filter.price = {
        $gte: parseFloat(req.query.minPrice),
        $lte: parseFloat(req.query.maxPrice),
      };
    }

    // const result = await Product.find({
    //   name: { $regex: new RegExp(req.query.name, "i") },
    // }).lean();

    const totalProducts = await Product.countDocuments({
      name: { $regex: new RegExp(req.query.name, "i") },
      ...filter,
    });

    const products = await Product.find({
      name: { $regex: new RegExp(req.query.name, "i") },
      ...filter,
    })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ price: sortPrice })
      .populate("category") // Populate để lấy thông tin danh mục
      .lean();

    return res.status(200).json({
      products,
      totalProducts,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / perPage),
    });
    // return res.status(200).json({ success: true, data: result });
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const slugExist = await Product.findOne({ slug: req.body.slug });
    if (slugExist && slugExist._id != req.params.id) {
      return res.status(400).json({ success: false, error: "Slug existed" });
    }

    const product = await Product.findById(req.params.id).lean();

    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        price: req.body.price,
        discount: req.body.discount,
        description: req.body.description,
        quantity: req.body.quantity,
        attributes: req.body.attributes,
        category: req.body.category,
        slug: req.body.slug,
        thumb: req.body.thumb,
      },
      { new: true }
    ).lean();
    if (!updateProduct) {
      return res.status(400).json({ success: false, error: err });
    }

    // check category change
    if (product.category != req.body.category) {
      // remove product from old category
      const removeProductFromCategory = await Category.findByIdAndUpdate(
        product.category,
        {
          $pull: { products: product._id },
        }
      );
      if (!removeProductFromCategory) {
        return res.status(400).json({ success: false, error: err });
      }

      // add product to new category
      const addToCategory = await Category.findByIdAndUpdate(
        req.body.category,
        {
          $push: { products: product._id },
        }
      );
      if (!addToCategory) {
        return res.status(400).json({ success: false, error: err });
      }
    }
    
    return res.status(200).json({ success: true, data: updateProduct });    
  } catch (error) {
    return res.status(400).json({ success: false, error: error });   
  }
}