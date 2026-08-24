import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Return from './pages/Return';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import CheckOut from './pages/CheckOut';
import Cart from './pages/Cart';
import OrderSuccess from './pages/OrderSuccess';
import Profile from "./pages/Profile";
import MyOrders from './pages/MyOrders';
import Shop from './pages/Shop';
import AdminDashboard from './admin/AdminDashboard';
import AdminProducts from './admin/AdminProducts';
import EditProduct from './admin/EditProduct';
import AddProduct from './admin/AddProduct';
import AdminOrders from './admin/AdminOrders';
import AdminUsers from "./admin/AdminUsers";


function App() {
  return (
    <Router>
      <Navbar />  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/return" element={<Return />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/ordersuccess" element={<OrderSuccess />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/edit-product/:id" element={<EditProduct />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/users" element={<AdminUsers />} />

        </Routes>
      <Footer/>
    </Router>
  );
}

export default App
