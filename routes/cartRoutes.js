import express from "express";
import { authMiddleware} from "../middlewares/authMiddleware.js";
import { addToCart } from "../controllers/cartController.js";

const router = express.Router();

router.post("/add",authMiddleware,addToCart)

export default router