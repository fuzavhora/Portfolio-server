const express = require("express");
const app = express();
const adminRoutes = require("./routes/admin.routes");
const projectRoutes = require("./routes/project.routes");
const contactRoutes = require("./routes/contact.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Middleware, routes, etc.
app.use(express.json());
app.use(cookieParser()); // <== this line is critical

app.use(
  cors({
    origin: "https://myprotfolio-eta-indol.vercel.app", // React frontend origin
    credentials: true, // Allow cookies to be sent
  })
);

// Example route
app.use("/contact", contactRoutes)
app.use("/admin", adminRoutes);
app.use("/project", projectRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app; // Export the app
