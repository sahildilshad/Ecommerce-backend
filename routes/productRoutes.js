import express from "express"
import { createProduct, getProducts, getSingleProduct } from "../controllers/productController.js"

const router = express.Router()



router.post("/create",createProduct)
router.get("/all-product",getProducts)
router.get("/product/:id",getSingleProduct)

export default router