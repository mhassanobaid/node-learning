const express = require("express");

const userRoutes = require("./routes/user.routes");
const notFound = require("./middleware/not-found.middleware");
const errorHandler = require("./middleware/error.middleware");

const app = express();

// Global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", userRoutes);

// 404 middleware
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
