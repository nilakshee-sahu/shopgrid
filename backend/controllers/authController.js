const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = await bcrypt.hash(otp, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verified: false,
      otpHash,
      otpExpires: Date.now() + 10 * 60 * 1000, // 10 minutes
    });

    const message = `Hello ${name},

Welcome to ShopGrid!

Thank you for creating your account with us.

Your email verification OTP is:

${otp}

This OTP is valid for 10 minutes. Please do not share this OTP with anyone.

If you did not create a ShopGrid account, you can safely ignore this email.

Best regards,
Team ShopGrid`;
    await sendEmail(email, "ShopGrid - Email Verification OTP", message);

    res.status(201).json({
      message: "Registration successful. OTP sent to your email.",
      email: user.email,
    });
  } catch (err) {
    console.error("Register Error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Check email verification
    if (!user.verified) {
      return res.status(401).json({
        message: "Please verify your email before logging in",
      });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("Login Error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json(users);
    
  } catch (err) {
    console.error("Get Users Error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// Verify Email By OTP
const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.verified) {
      return res.status(400).json({
        message: "Email already verified",
      });
    }

    if (!user.otpHash || !user.otpExpires) {
      return res.status(400).json({
        message: "No valid OTP found. Please request a new OTP.",
      });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({
        message: "OTP expired. Please request a new OTP.",
      });
    }

    const isMatch = await bcrypt.compare(otp, user.otpHash);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    user.verified = true;
    user.otpHash = undefined;
    user.otpExpires = undefined;

    await user.save();

    res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (err) {
    console.error("Verify Email Error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// Resend OTP
const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.verified) {
      return res.status(400).json({
        message: "Email is already verified",
      });
    }

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = await bcrypt.hash(otp, 10);

    // Save OTP and expiry
    user.otpHash = otpHash;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    // Send email
    const message = `Hello ${user.name},

Here is your new ShopGrid email verification OTP:

${otp}

This OTP is valid for 10 minutes. Please do not share this OTP with anyone.

If you did not request a new verification OTP, you can safely ignore this email.

Best regards,
Team ShopGrid`;
    await sendEmail(email, "ShopGrid - New Verification OTP", message);

    res.status(200).json({
      message: "New OTP sent successfully",
    });
  } catch (err) {
    console.error("Resend OTP Error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  verifyEmail,
  resendOTP,
};
