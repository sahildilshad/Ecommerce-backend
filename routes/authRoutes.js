import express from "express";
import { createUser ,deleteUser,getAllUser,getSingleUser,loginUser, logoutUser, updateUser} from "../controllers/userController.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register",createUser)
router.post("/login",loginUser)
router.get("/logout",logoutUser)
router.get("/all-users",authMiddleware,getAllUser)
router.get("/get-single-user/:id",authMiddleware,isAdmin, getSingleUser)
router.delete("/delete-user/:id",deleteUser)
router.put("/update-user",authMiddleware,updateUser)
export default router;
