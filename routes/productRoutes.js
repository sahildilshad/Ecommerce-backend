import express from "express"
import { createProduct, deleteProduct, getProducts, getSingleProduct, updateProduct } from "../controllers/productController.js"
import { authMiddleware,isAdmin } from "../middlewares/authMiddleware.js"

const router = express.Router()



router.post("/create",authMiddleware,isAdmin,createProduct)
router.get("/all-product",authMiddleware,getProducts)
router.get("/product/:id",authMiddleware,getSingleProduct)
router.put("/update/:id",authMiddleware,isAdmin,updateProduct)
router.delete("/delete/:id",authMiddleware,isAdmin,deleteProduct)

export default router