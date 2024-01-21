// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const secretKey = process.env.SECRET_KEY;

async function signup(req, res) {
  const { name, email, password } = req.body;
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({ name, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).send('User created successfully');
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key (email) error
      res.status(400).send('Email already exists');
    } else {
      res.status(500).send('Error creating user');
    }
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  // Find the user in the database
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json('User not found');
  }

  // Compare the password
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json('Invalid password');
  }

  // Create and send JWT token
  const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY);
  res.json({ token });
}

module.exports = {
  signup,
  login,
};
