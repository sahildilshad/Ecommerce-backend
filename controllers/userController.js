import { User } from "../models/userModel.js";

export const createUser = async (req, res) => {
  try {
    const { email } = req.body;

    const findUser = await User.findOne({email});

    if (!findUser) {
      // create a new user
      const newUser = await User.create(req.body);
      res.status(201).json({
        success: true,
        mesaage: "User created successfully",
        newUser,
      });
    } else {
      // user already exists
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
  } catch (error) {
    console.log("error in creating user", error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
