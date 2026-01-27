import Product from "../models/productModel.js";
import slugify from "slugify";

// create product
export const createProduct = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const { title, description, price, quantity, category, brand } = req.body;

    if (!title || !description || !price || !quantity || !category || !brand) {
      res.status(400).json({
        message: "all fields are required",
      });
    }
    const newProduct = await Product.create({
      title,
      description,
      category,
      price,
      quantity,
      brand,
      slug: slugify(title, { lower: true }),
    });

    res.status(201).json({
      message: "product create successfully",
      newProduct,
    });
  } catch (error) {
    console.log("error in creating product", error.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

// get product

export const getProducts = async (req, res) => {
  try {
    let filter={}
     if (req.query.brand) {
      filter.brand = req.query.brand;
    }

    if (req.query.category) {
      filter.category = req.query.category;
    }

    const products = await Product.find(filter);

    res.status(200).json({
      message: "product fetching successfully",
      products,
    });
  } catch (error) {
    console.log("error in fetching product", error.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

// get single product

export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      product,
    });
  } catch (error) {
    console.log("error in fetching single product", error.message);
    res.status(201).json({
      message: "internal server error",
    });
  }
};

// update product

export const updateProduct = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const { title, description, price, quantity, category,brand } = req.body;

    if (!title || !description || !price || !quantity || !category || !brand) {
      res.status(400).json({
        message: "all fields are required",
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.title = title;
    product.description = description;
    product.category = category;
    product.price = price;
    product.quantity = quantity;
    product.brand = brand;

    await product.save();
    res.status(201).json({
      message: "product update successfully",
      product,
    });
  } catch (error) {
    console.log("error in updating single product", error.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};
// delete product

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.status(200).json({
      message: "product delete successfully",
      deletedProduct,
    });
  } catch (error) {
    console.log("error in deleted single product", error.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};
