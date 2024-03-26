const { db } = require("../models");
const User = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userController = {};
// Signup route
userController.signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login route
userController.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, "yourSecretKeyHere", { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
userController.updateUserRole = async (req, res) => {
  try {
    const {userId} = req.params.userId;
    // Find the user by ID and update their role
    const updatedUser = await User.findByIdAndUpdate(userId, { role: 'admin' }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User role updated to admin', user: updatedUser });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = userController;
