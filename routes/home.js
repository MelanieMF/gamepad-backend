const express = require("express");
const axios = require("axios");
const router = express.Router();

const apiKey = process.env.API_KEY;

router.get("/", async (req, res) => {
  // nom, date de sortie et note
  // type de jeu et plateforme
  const platforms = req.query.platforms; //GOOD
  const search = req.query.search;
  const type = req.query.genres; //GOOD
  const released = req.query.realsed;
  const rating = req.query.rating;

  if (platforms) {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=ee7acd3aea974d95b29d55f9c60f5960&platforms=${platforms}`
      );
      res.status(200).json(response.data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=ee7acd3aea974d95b29d55f9c60f5960&search=${search}&type=${type}&released=${released}&rating=${rating}`
      );
      res.status(200).json(response.data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
});

module.exports = router;
