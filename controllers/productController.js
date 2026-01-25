import Product from "../models/productModel.js";

// create product
export const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);

    res.status(201).json({
      message: "product create successfully",
      newProduct,
    });
  } catch (error) {
    console.log("error in creating product", error.message);
    res.status(201).json({
      message: "internal server error",
    });
  }
};

// get product

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      message: "product fetching successfully",
      products,
    });
  } catch (error) {
    console.log("error in fetching product", error.message);
    res.status(201).json({
      message: "internal server error",
    });
  }
};

// get single product

export const getSingleProduct = async (req,res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json({
            product
        })
    } catch (error) {
         console.log("error in fetching single product", error.message);
    res.status(201).json({
      message: "internal server error",
    });
    }
    
}