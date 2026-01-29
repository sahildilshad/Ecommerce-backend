import Cart from "../models/cartModel.js";

// add to cart items

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ productId, quantity }],
      });
      return res.status(201).json(cart);
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId,
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.log("error in add to cart", error.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

// get product

export const getProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    let cartProduct = await Cart.findOne({ userId }).populate(
      "items.productId",
    );

    if (!cartProduct) {
      return res.status(404).json({
        items: [],
      });
    }

    res.status(200).json({
      cartProduct,
    });
  } catch (error) {
    console.log("error in add to cart", error.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

// delete product

export const deleteProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId,
    );

    await cart.save();

    res.status(200).json({
      cart,
    });
  } catch (error) {
    console.log("error in add to cart", error.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

// update quantity

export const updateCartQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const {productId} = req.params
    const { quantity } = req.body;

    const cart = await Cart.findOne({ userId });



    if (!cart) {
      return res.status(404).json({
        message: "item not found",
      });
    }

    const itemIndex = cart.items.findIndex((item) => {
     return item.productId.toString() === productId;
    });

    if (itemIndex === -1) {
      return res.status(404).json({
        message: "item not found in cart",
      });
    }

    // quantity update

    cart.items[itemIndex].quantity = quantity + cart.items[itemIndex].quantity;

if (cart.items[itemIndex].quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    }
    await cart.save()
res.json({
  message:"successfully"
})
  } catch (error) {
    console.log("error in add to cart", error.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};
