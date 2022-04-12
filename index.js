// Imports
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);
// mongoose.connect("mongodb://localhost:27017/gamepad-melanie");

const app = express();
app.use(formidable());
app.use(cors());
app.use(morgan("dev"));

// Routes

// Route "Home"
const home = require("./routes/home");
app.use(home);

// Route "Game detail"
const games = require("./routes/games");
app.use(games);

const users = require("./routes/users");
app.use(users);

const favorites = require("./routes/favorites");
app.use(favorites);

const reviews = require("./routes/reviews");
app.use(reviews);

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
