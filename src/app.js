require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authMiddleware = require("./middleware/authMiddleware");
const proxyRoutes = require("./routes/proxyRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(authMiddleware);

proxyRoutes(app);

module.exports = app;
