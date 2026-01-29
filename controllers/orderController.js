import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    let totalAmount = 0;
    cart.items.forEach((item) => {
      return (totalAmount = totalAmount + item.productId.price * item.quantity);
    });
    const order = await Order.create({
        userId,
        items:cart.items.map((item)=>({
            productId:item.productId._id,
            quantity:item.quantity
        })),
       totalPrice:totalAmount
    })

    cart.items = [];
  await cart.save();

    res.json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.log("error in placed order", error.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};
