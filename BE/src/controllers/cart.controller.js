import Shop from "../models/shop.model.js";

export const addTocart = async (req, res) => {
  try {
    console.log(req.body.product_id);
    const shop = await Shop.findByIdAndUpdate(
      req.params.id,
      {
        $push: { 
          cart: [
            {
              product: req.body.product_id,
              quantity: req.body.quantity,
            },
          ]
         },
      },
      { new: true }
    );

    if (!shop) {
      return res.status(400).json({ success: false, error: "No Shop" });
    }
    return res.status(200).json({ success: true, data: shop });
  } catch (error) {
    return res.status(400).json({ success: false, error: 'Can not add to cart' });
  }
};

export const getCart = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id).populate("cart.product").lean();
    // lean(): convert to plain JS object
    if (!shop) {
      return res.status(400).json({ success: false, error: err });
    }
    return res.status(200).json({ success: true, data: shop.cart });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const shop = await Shop.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { cart: { _id: req.body.cart_id } },
      },
      { new: true }
    );
    if (!shop) {
      return res.status(400).json({ success: false, error: err });
    }
    return res.status(200).json({ success: true, data: shop });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};

export const deleteAll = async (req, res) => {
  try {
    const shop = await Shop.findByIdAndUpdate(
      req.params.id,
      {
        $set: { cart: [] },
      },
      { new: true }
    );
    if (!shop) {
      return res.status(400).json({ success: false, error: err });
    }
    return res.status(200).json({ success: true, data: shop });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};


export const updateAll = async (req, res) => {
  try {
    const shop = await Shop.findByIdAndUpdate(
      req.params.id,
      {
        $set: { cart: req.body.cart },
      },
      { new: true }
    );
    if (!shop) {
      return res.status(400).json({ success: false, error: err });
    }
    return res.status(200).json({ success: true, data: shop });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};
