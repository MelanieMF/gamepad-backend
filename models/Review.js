const mongoose = require("mongoose");

const Review = mongoose.model("Review", {
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
  username: {
    type: String,
    required: true,
  },
  avatar: Object,
  title: { type: String, required: true },
  description: { type: String, required: true },
  like: [{ type: mongoose.Schema.Types.Mixed, ref: "User" }],
  dislike: [{ type: mongoose.Schema.Types.Mixed, ref: "User" }],
  game: Object,
  rank: Number,
  game_id: Number,
});

module.exports = Review;
