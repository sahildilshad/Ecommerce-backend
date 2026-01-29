import express from "express";
import { configDotenv } from "dotenv";


import authRouter from "./routes/authRoutes.js"
import productRouter from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"



import cookieParser from "cookie-parser";
import morgan from "morgan";

import { connectDb } from "./config/dbConnect.js";
configDotenv()
const PORT = process.env.PORT || 4000

connectDb()

const app = express()
app.use(cookieParser())
app.use(morgan("dev"))

app.use(express.json())

app.use("/api/user",authRouter)
app.use("/api/product",productRouter)

app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);   
})