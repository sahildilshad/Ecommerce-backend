import express from "express";
import { createUser ,deleteUser,getAllUser,getSingleUser,loginUser, updateUser} from "../controllers/userController.js";

const router = express.Router();

router.post("/register",createUser)
router.post("/login",loginUser)
router.get("/all-users",getAllUser)
router.get("/get-single-user/:id",getSingleUser)
router.delete("/delete-user/:id",deleteUser)
router.put("/update-user/:id",updateUser)
export default router;
