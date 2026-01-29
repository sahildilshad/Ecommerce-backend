import express from "express"
import { placeOrder } from "../controllers/orderController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"

const router = express.Router()


router.post("/placed",authMiddleware,placeOrder)

export default router