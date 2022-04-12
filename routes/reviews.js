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
      username: req.user.username,
      game_id: req.fields.game_id,
    });
    // console.log(reviewExists);
    // console.log(req.user);
    // console.log(req.fields.game_id);

    if (reviewExists === null) {
      // console.log(req.fields);
      const addReview = new Review({
        username: req.user.username,
        avatar: req.user.avatar.secure_url,
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
router.get("/reviews/:id", async (req, res) => {
  // console.log(req.fields.name);
  try {
    const reviews = await Review.find({ game_id: req.params.id });
    reviews && res.send(reviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// // LIKE REVIEW
// router.post("/review/like", isAuthenticated, async (req, res) => {
//   const review = await Review.findById(req.fields._id);

//   const likeExist = review.likes.indexOf(req.user.username);
//   try {
//     if (likeExist === -1) {
//       review.likes.push(req.user.username);
//       await review.save();

//       res.json(review);
//     } else {
//       review.likes.splice(likeExist, 1);
//       await review.save();

//       res.json(review);
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // DISLIKE REVIEW
// router.post("/review/dislike", isAuthenticated, async (req, res) => {
//   const review = await Review.findById(req.fields._id);

//   const dislikeExist = review.dislikes.indexOf(req.user.username);
//   try {
//     if (dislikeExist === -1) {
//       review.dislikes.push(req.user.username);
//       await review.save();

//       res.json(review);
//     } else {
//       review.dislikes.splice(dislikeExist, 1);
//       await review.save();

//       res.json(review);
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // DELETE
// router.post("/delete/reviews", async (req, res) => {
//   try {
//     await Review.findByIdAndDelete(req.fields._id);

//     res.json({ message: "Your review succesfully removed" });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

module.exports = router;
