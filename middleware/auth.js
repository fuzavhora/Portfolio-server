// middleware/auth.js
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  console.log("req.cookies.token:", req.cookies.token);
  console.log("req.headers.authorization:", req.headers.authorization);
  console.log("token:", token);

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.username = decoded.username;
    console.log(req.username);

    const admin = await Admin.findOne({ username: req.username });
    if (!admin) {
      return res.status(401).json({ message: "Unauthorized: Admin not found" });
    }

    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};

module.exports = verifyToken;
