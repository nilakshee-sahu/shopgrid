# 🛒 SHOPGRID - Full-Stack MERN E-Commerce App

---

A professionally engineered, full-stack E-commerce platform built strictly using modern standard React (CRA) on the frontend and Express/MongoDB on the backend.

---

## 🛠️ Tech Stack Details

* **Frontend:** Pure React.js (`react-scripts`), Redux Toolkit for Cart state management, AuthContext API for JWT-based user sessions.
* **Backend:** Node.js, Express.js with middleware-based routing and REST APIs.
* **Database:** MongoDB using Mongoose schemas.
* **Features:** Unified Admin Dashboard, personal user profiles, mapped order histories, product management, cart management, and order management.
* **Payments:** Razorpay integration for secure online payments.
* **Cloud Storage:** Cloudinary integration for secure product image uploading using Multer.

---

## ✨ Key Features

* 🔐 JWT-based user authentication
* 🛍️ Product browsing and detailed product pages
* 🛒 Redux-powered shopping cart
* 👤 User profiles and order history
* 👨‍💼 Admin dashboard
* 📦 Product and order management
* 💳 Razorpay payment integration
* ☁️ Cloudinary product image storage
* 📱 Responsive user interface

---

## ⚙️ Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/shopgrid.git
cd shopgrid
```

### 2. Install Dependencies

```bash
npm install
```

Install dependencies separately if frontend and backend have separate folders.

### 3. Environment Variables

Create a `.env` file in the backend:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

### 4. Run the Project

```bash
npm start
```

For development, use the appropriate frontend and backend start commands configured in the project.

---

## 🔒 Security

* JWT authentication for protected sessions
* Passwords securely hashed before storage
* Protected admin routes
* Environment variables for sensitive credentials
* Secure cloud-based image storage
* Razorpay payment verification

---

## 👨‍💻 Author

**Nilakshee Sahu**

B.Tech — Computer Science & Engineering

---

⭐ If you like this project, consider giving the repository a star!
