const express = require("express");
const router = express.Router();

const admin = require("../middleware/adminMiddleware");
const protect = require("../middleware/authMIddleware");

const {
  getProducts,
  createProduct,
  getProductByID,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const multer = require("multer");
const { storage } = require("../config/cloudinary");

const upload = multer({ storage });

// All products
router
  .route("/")
  .get(getProducts)
  .post(protect, admin, upload.single("image"), createProduct);

// Specific product
router
  .route("/:id")
  .get(getProductByID)
  .put(protect, admin, upload.single("image"), updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router;