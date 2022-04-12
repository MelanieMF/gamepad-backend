const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const formidableMiddleware = require("express-formidable");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
const router = express.Router();

const User = require("../models/User");
const cloudinary = require("cloudinary").v2;

router.use(formidableMiddleware());

cloudinary.config({
  cloud_name: "dvk3iytuh",
  api_key: "469256949544519",
  api_secret: "Mas5n9wSpC2OHwltOgfBdR2iyMg",
});

router.post("/user/signup", async (req, res) => {
  try {
    if (req.fields.username === undefined) {
      res.status(406).json({ message: "Missing parameter(s)" });
    } else {
      const isUserExist = await User.findOne({ email: req.fields.email });
      console.log("test 2");

      if (isUserExist !== null) {
        res.status(407).json({ message: "This email already has an account" });
      } else {
        const salt = uid2(64);
        const hash = SHA256(req.fields.password + salt).toString(encBase64);
        const token = uid2(64);

        const newUser = new User({
          email: req.fields.email,
          username: req.fields.username,
          token: token,
          hash: hash,
          salt: salt,
        });
        newUser.avatar = await cloudinary.uploader.upload(
          req.files.avatar.path
        );
        await newUser.save();
        res.json({
          _id: newUser._id,
          email: newUser.email,
          token: newUser.token,
        });
      }
    }
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.fields.email });
    if (user === null) {
      res.status(400).json({ message: "Non autorisé" });
    } else {
      console.log(user.hash, "Hash à comparer");
      const newHash = SHA256(req.fields.password + user.salt).toString(
        encBase64
      );
      console.log(newHash);
      if (user.hash === newHash) {
        res.json({
          _id: user._id,
          token: user.token,
          account: user.account,
        });
      } else {
        res.status(401).json({ error: "Non autorisé" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET
router.get("/profil", isAuthenticated, async (req, res) => {
  try {
    const profil = await User.find({ id: req.user.id });
    res.send(profil);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
