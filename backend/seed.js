require("dotenv").config();
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");

const seedDatabase = async () => {
  try {
    await connectDB();

    await Promise.all([
      User.deleteMany({}),
      Product.deleteMany({}),
      Order.deleteMany({}),
    ]);

    const hashedPassword = await bcrypt.hash("12345678", 10);

    const users = await User.insertMany([
      {
        name: "Admin User",
        email: "admin@shopgrid.com",
        password: hashedPassword,
        role: "admin",
        verified: true,
      },
      {
        name: "Jane Doe",
        email: "jane@example.com",
        password: hashedPassword,
        role: "user",
        verified: true,
      },
      {
        name: "John Smith",
        email: "john@example.com",
        password: hashedPassword,
        role: "user",
        verified: false,
      },
    ]);

    const products = await Product.insertMany([
      {
        name: "Wireless Headphones",
        description:
          "Noise-cancelling over-ear headphones with 30-hour battery life.",
        price: 1299,
        imageURL:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        category: "Electronics",
        stock: 15,
        rating: 4.7,
        numReviews: 120,
      },
      {
        name: "Smart Watch",
        description:
          "Track fitness, receive notifications, and monitor health on the go.",
        price: 799,
        imageURL:
          "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
        category: "Wearables",
        stock: 20,
        rating: 4.5,
        numReviews: 87,
      },
      {
        name: "Gaming Keyboard",
        description:
          "Mechanical keyboard with RGB lighting and tactile switches.",
        price: 2499,
        imageURL:
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
        category: "Accessories",
        stock: 10,
        rating: 4.8,
        numReviews: 64,
      },
      {
        name: "Portable Speaker",
        description:
          "Water-resistant Bluetooth speaker with rich bass and 12-hour playtime.",
        price: 3999,
        imageURL:
          "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
        category: "Audio",
        stock: 8,
        rating: 4.6,
        numReviews: 45,
      },
      {
        name: "Laptop Backpack",
        description:
          "Durable travel backpack with dedicated laptop sleeve and multiple pockets.",
        price: 1599,
        imageURL:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        category: "Bags",
        stock: 25,
        rating: 4.2,
        numReviews: 33,
      },
      {
        name: "Ultra HD Monitor",
        description:
          "27-inch 4K monitor with vibrant colors and ultra-slim bezels.",
        price: 3299,
        imageURL:
          "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
        category: "Electronics",
        stock: 12,
        rating: 4.7,
        numReviews: 56,
      },
      {
        name: "Coffee Maker",
        description:
          "Compact espresso machine with frother and quick brew technology.",
        price: 1899,
        imageURL:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
        category: "Home",
        stock: 18,
        rating: 4.4,
        numReviews: 41,
      },
      {
        name: "Fitness Tracker",
        description:
          "Water-resistant fitness band with heart-rate monitoring and sleep tracking.",
        price: 2499,
        imageURL:
          "https://images.unsplash.com/photo-1575311373937-040b8e1fd5ae?auto=format&fit=crop&w=800&q=80",
        category: "Wearables",
        stock: 14,
        rating: 4.6,
        numReviews: 72,
      },
      {
        name: "DSLR Camera",
        description:
          "24MP camera with 4K video capability and image stabilization.",
        price: 5499,
        imageURL:
          "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
        category: "Electronics",
        stock: 7,
        rating: 4.8,
        numReviews: 39,
      },
      {
        name: "Ergonomic Chair",
        description:
          "Adjustable lumbar support chair designed for long work sessions.",
        price: 4599,
        imageURL:
          "https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=800&q=80",
        category: "Furniture",
        stock: 9,
        rating: 4.5,
        numReviews: 28,
      },
    ]);

    const admin = users[0];
    const customer = users[1];
    const secondCustomer = users[2];
    const firstProduct = products[0];
    const secondProduct = products[1];
    const thirdProduct = products[5];
    const fourthProduct = products[6];
    const fifthProduct = products[8];

    await Order.insertMany([
      {
        user: customer._id,
        items: [
          {
            product: firstProduct._id,
            quantity: 1,
            price: firstProduct.price,
          },
          {
            product: secondProduct._id,
            quantity: 2,
            price: secondProduct.price,
          },
        ],
        totalAmount: firstProduct.price + secondProduct.price * 2,
        shippingAddress: {
          fullname: customer.name,
          phone: 9876543210,
          email: customer.email,
          street: "123 Market Street",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          pinCode: 400001,
        },
        paymentId: "dummy_payment_001",
        status: "pending",
      },
      {
        user: admin._id,
        items: [
          {
            product: thirdProduct._id,
            quantity: 1,
            price: thirdProduct.price,
          },
          {
            product: fourthProduct._id,
            quantity: 1,
            price: fourthProduct.price,
          },
        ],
        totalAmount: thirdProduct.price + fourthProduct.price,
        shippingAddress: {
          fullname: admin.name,
          phone: 9123456780,
          email: admin.email,
          street: "45 Admin Avenue",
          city: "Delhi",
          state: "Delhi",
          country: "India",
          pinCode: 110001,
        },
        paymentId: "dummy_payment_002",
        status: "processing",
      },
      {
        user: secondCustomer._id,
        items: [
          {
            product: fifthProduct._id,
            quantity: 1,
            price: fifthProduct.price,
          },
          {
            product: secondProduct._id,
            quantity: 1,
            price: secondProduct.price,
          },
        ],
        totalAmount: fifthProduct.price + secondProduct.price,
        shippingAddress: {
          fullname: secondCustomer.name,
          phone: 9988776655,
          email: secondCustomer.email,
          street: "88 River Road",
          city: "Bengaluru",
          state: "Karnataka",
          country: "India",
          pinCode: 560001,
        },
        paymentId: "dummy_payment_003",
        status: "delivered",
      },
    ]);

    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedDatabase();
