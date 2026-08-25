const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const products = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "Premium wireless headphones with noise cancellation and deep bass.",
    price: 2499,
    imageURL: "https://res.cloudinary.com/demo/image/upload/v1/shopgrid/headphones.jpg",
    category: "Electronics",
    stock: 25
  },
  {
    name: "Smart Watch Series 5",
    description: "Modern smartwatch with fitness tracking, heart rate monitoring and notifications.",
    price: 3999,
    imageURL: "https://res.cloudinary.com/demo/image/upload/v1/shopgrid/smartwatch.jpg",
    category: "Electronics",
    stock: 18
  },
  {
    name: "Running Shoes",
    description: "Lightweight and comfortable running shoes designed for everyday workouts.",
    price: 2999,
    imageURL: "https://res.cloudinary.com/demo/image/upload/v1/shopgrid/running-shoes.jpg",
    category: "Footwear",
    stock: 30
  },
  {
    name: "Men's Casual T-Shirt",
    description: "Comfortable cotton t-shirt with a stylish casual design.",
    price: 799,
    imageURL: "https://res.cloudinary.com/demo/image/upload/v1/shopgrid/tshirt.jpg",
    category: "Clothing",
    stock: 50
  },
  {
    name: "Women's Denim Jacket",
    description: "Classic denim jacket suitable for casual and everyday wear.",
    price: 1999,
    imageURL: "https://res.cloudinary.com/demo/image/upload/v1/shopgrid/denim-jacket.jpg",
    category: "Clothing",
    stock: 20
  },
  {
    name: "Laptop Backpack",
    description: "Water-resistant backpack with dedicated laptop compartment and multiple pockets.",
    price: 1499,
    imageURL: "https://res.cloudinary.com/demo/image/upload/v1/shopgrid/backpack.jpg",
    category: "Accessories",
    stock: 35
  },
  {
    name: "Ceramic Coffee Mug",
    description: "Premium ceramic coffee mug with a simple and elegant design.",
    price: 499,
    imageURL: "https://res.cloudinary.com/demo/image/upload/v1/shopgrid/coffee-mug.jpg",
    category: "Home",
    stock: 45
  },
  {
    name: "Portable Bluetooth Speaker",
    description: "Compact wireless speaker with powerful sound and long battery life.",
    price: 1799,
    imageURL: "https://res.cloudinary.com/demo/image/upload/v1/shopgrid/bluetooth-speaker.jpg",
    category: "Electronics",
    stock: 22
  },
  {
    name: "Classic Leather Wallet",
    description: "Slim genuine leather wallet with multiple card and cash compartments.",
    price: 999,
    imageURL: "https://res.cloudinary.com/demo/image/upload/v1/shopgrid/leather-wallet.jpg",
    category: "Accessories",
    stock: 40
  },
  {
    name: "Stainless Steel Water Bottle",
    description: "Durable insulated water bottle that keeps beverages hot or cold for hours.",
    price: 899,
    imageURL: "https://res.cloudinary.com/demo/image/upload/v1/shopgrid/water-bottle.jpg",
    category: "Home",
    stock: 32
  },
  {
    name: "Gaming Mouse",
    description: "High-precision gaming mouse with adjustable DPI and RGB lighting.",
    price: 1299,
    imageURL: "https://res.cloudinary.com/demo/image/upload/v1/shopgrid/gaming-mouse.jpg",
    category: "Electronics",
    stock: 28
  },
  {
    name: "Men's Formal Shirt",
    description: "Slim-fit formal shirt made with comfortable and breathable fabric.",
    price: 1299,
    imageURL: "https://res.cloudinary.com/demo/image/upload/v1/shopgrid/formal-shirt.jpg",
    category: "Clothing",
    stock: 25
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log(`${products.length} products inserted successfully`);

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedProducts();