require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

// Step 1.1 middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Step 2.1 CORS
app.use(cors());

// Step 1.3 logging (morgan)
app.use(morgan("dev"));

// Step 1.2 custom middleware (simple)
app.use((req, res, next) => {
  req.customValue = "ok";
  next();
});

// Base routes
app.get("/", (req, res) => {
  res.send("Hello World " + req.customValue);
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Step 1.4 error handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});