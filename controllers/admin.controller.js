const dotenv = require("dotenv");
const asyncHandler = require("../utils/asyncHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");

dotenv.config();

const registerAdmin = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;

  // Check required fields
  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ message: "Please provide username, password, and email" });
  }

  // Check if admin already exists by email
  const existingAdmin = await Admin.findOne({ email });

  if (existingAdmin) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // Optional: Also check for duplicate username
  const existingUsername = await Admin.findOne({ username });

  if (existingUsername) {
    return res.status(400).json({ message: "Username already taken" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create admin
  const newAdmin = new Admin({
    username,
    email,
    password: hashedPassword,
  });

  await newAdmin.save();

  // Respond with success
  res.status(201).json({  message: "Admin registered successfully" });
});


const adminLogin = asyncHandler(async (req, res) => {
  //get username and password from request body or frontend
  const { username, password } = req.body;
  //check if username and password are provided
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide username and password" });
  }
  //check if username and password are valid
  const adminUsername = await Admin.findOne({ username });
  console.log(adminUsername);
  
  if (!adminUsername) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
 
  const isMatch = bcrypt.compareSync(password, adminUsername.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  //if valid, return success message and token
  let {email} = adminUsername;
  const token = jwt.sign({ username , email}, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
    sameSite: "Strict", // CSRF protection
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
  res.status(200).json({success : true, message: "Login successful" , token});

});
module.exports = { registerAdmin, adminLogin };
