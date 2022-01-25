const express = require("express");
const axios = require("axios");
const { response } = require("express");
const router = express.Router();

const apiKey = process.env.API_KEY;

// Game Detail
router.get("/games/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${req.params.id}?key=ee7acd3aea974d95b29d55f9c60f5960`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Similar Games
router.get("/games/:id/similar-games", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${req.params.id}/game-series?key=ee7acd3aea974d95b29d55f9c60f5960`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
