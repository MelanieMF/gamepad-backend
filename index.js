// Imports
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

mongoose.connect("mongodb://localhost/gamepad-melanie");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(formidable());
app.use(cors());
app.use(morgan("dev"));

// Routes
const home = require("./routes/home");
app.use(home);

const games = require("./routes/games");
const router = require("./routes/home");
app.use(games);

// All Routes

app.get("/", (req, res) => {
  res.send("Welcome to my api");
});

app.all("*", (req, res) => {
  res.status(400).json({ message: error.message });
});

// Port
app.listen(4000, () => {
  console.log("Le serveur a démarré");
});