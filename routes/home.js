const express = require("express");
const axios = require("axios");
const router = express.Router();

const apiKey = process.env.API_KEY;

router.get("/", async (req, res) => {
  // nom, date de sortie et note
  // type de jeu et plateforme
  try {
    const searchGame = req.query.search;
    const released = req.query.realsed;
    const rating = req.query.rating;
    const platform = req.query.platform;
    const type = req.query.genres;

    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${apiKey}&search=${searchGame}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
