const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

const getAdminStats = async (req, res) => {
    try{
        const totalUsers = await User.countDocuments({ role: "user" });
        const totalProducts = await Product.countDocuments({});
        const totalOrders = await Order.countDocuments({});

        const orders = await Order.find({});

        const totalRevenueData = orders.reduce((acc, item) => acc + ( item.totalAmount || 0), 0).toFixed(2);

        res.json({
            totalUsers,
            totalProducts,
            totalOrders,
            totalRevenue: totalRevenueData
        });
    }
    catch(err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAdminStats
};