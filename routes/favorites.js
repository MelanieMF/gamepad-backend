const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const formidableMiddleware = require("express-formidable");
const router = express.Router();

const User = require("../models/User");

router.use(formidableMiddleware());

// <---------------- FAVORIS ---------------->
// CREATE
router.post("/add/favorites", isAuthenticated, async (req, res) => {
  try {
    const user = req.user;
    let isAlreadyFavorite = false;
    let indexFav;
    // console.log(req.fields);
    for (let i = 0; i < user.favoris.length; i++) {
      if (user.favoris[i].id === req.fields.id) {
        isAlreadyFavorite = true;
        indexFav = i;
      }
    }
    if (isAlreadyFavorite === false) {
      const addFav = {
        name: req.fields.name,
        background_image: req.fields.background_image,
        id: req.fields.id,
      };
      // console.log(addFav);
      user.favoris.push(addFav);
      await user.save();
      res.json({ message: "Ajouté aux favoris" });
    } else {
      console.log(user.favoris);
      user.favoris.splice(indexFav, 1);
      console.log(user.favoris);
      await user.save();
      res.status(200).json({ message: "Retiré des favoris" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ
router.get("/favoris", async (req, res) => {
  // console.log(req.fields.name);
  try {
    const user = await User.findOne({
      token: req.headers.authorization.slice(7),
    });
    res.json(user.favoris);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
