import express from "express";
import { authMiddleware} from "../middlewares/authMiddleware.js";
import { addToCart, deleteProduct, getProduct, updateCartQuantity } from "../controllers/cartController.js";

const router = express.Router();

router.post("/add",authMiddleware,addToCart)
router.get("/get/cart",authMiddleware,getProduct)
router.delete("/remove/:id",authMiddleware,deleteProduct)
router.put("/update/:productId",authMiddleware,updateCartQuantity)

export default router