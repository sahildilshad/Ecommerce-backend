import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// create a user
export const createUser = async (req, res) => {
  try {
    const { email, password, firstname, lastname, mobile } = req.body;
    if (!email || !password || !firstname || !lastname || !mobile) {
      return res.status(404).json({
        message: "all fields are required",
      });
    }

    const findUser = await User.findOne({ email });

    if (!findUser) {
      // create a new user

      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        firstname,
        lastname,
        email,
        password: hashPassword,
        mobile,
      });
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

// login a user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // password compare
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "login successfully",
      id: user?._id,
      firstname: user?.firstname,
      lastname: user?.lastname,
      password: user?.password,
      mobile: user?.mobile,
      role: user?.role,
      token,
    });
  } catch (error) {
    console.log("error in creating user", error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

// get all user

export const getAllUser = async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    console.log("error in creating user", error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

// get single user
export const getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        success: false,
        mesaage: "user not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "user fetch successfully",
      user,
    });
  } catch (error) {
    throw new Error(error);
  }
};

// delete  user
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      res.status(404).json({
        success: false,
        mesaage: "user not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "user delete successfully",
      deletedUser,
    });
  } catch (error) {
    console.log("error in delete user", error.message);

    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

// update the user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        firstname: req.body?.firstname,
        lastname: req.body?.lastname,
        email: req.body?.email,
        mobile: req.body?.mobile,
      },
      { new: true },
    );

    if (!updateUser) {
    return  res.status(404).json({
        success: false,
        mesaage: "user not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "user update successfully",
      updateUser,
    });
  } catch (error) {
    console.log("error in delete user", error.message);

    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};
