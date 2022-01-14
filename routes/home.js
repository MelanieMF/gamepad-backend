const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const searchGame = req.query.search;
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=ee7acd3aea974d95b29d55f9c60f5960&search=${searchGame}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
