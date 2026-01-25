import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    let token;

    if (req?.headers?.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Token not found, please login again",
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded; 
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "No token attached to header",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export const isAdmin = async (req,res,next) => {
   
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const adminUser = await User.findById(req.user.id)
      // check user exists
    if (!adminUser) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    if(adminUser.role !== "admin"){
      return  res.status(403).json({
            success:false,
            message:"You are not an admin"
        })
    }else{
        next()
    }

}