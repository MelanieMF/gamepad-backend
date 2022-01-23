const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const formidableMiddleware = require("express-formidable");
const router = express.Router();

const User = require("../models/User");
const Review = require("../models/Review");

router.use(formidableMiddleware());

// <---------------- REVIEWS ---------------->
// CREATE
router.post("/add/reviews", isAuthenticated, async (req, res) => {
  try {
    const user = req.user;
    // console.log(req.user);
    const reviewExists = await Review.findOne({
      username: req.user.account.username,
      game_id: req.fields.game_id,
    });
    console.log(reviewExists);
    // console.log(req.user);
    console.log(req.fields.game_id);

    if (reviewExists === null) {
      // console.log(req.fields);
      const addReview = new Review({
        username: req.user.account.username,
        title: req.fields.title,
        description: req.fields.text,
        game_id: req.fields.game_id,
      });
      user.reviews.push(addReview);
      await addReview.save();
      await user.save();
      res.json({ message: "Review add" });
    } else {
      res
        .status(200)
        .json({ message: "You already let a review for this game" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ
// router.get("/reviews", async (req, res) => {
//   // console.log(req.fields.name);
//   try {
//     const user = await User.findOne({
//       token: req.headers.authorization.slice(7),
//     });
//     res.json(user.favoris);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

module.exports = router;
