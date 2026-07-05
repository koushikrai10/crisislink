const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      // role automatically becomes "user"
    });

    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.status(201).json(safeUser);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    // ✅ JWT now contains role & name
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.json({
      token,
      user: safeUser,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};