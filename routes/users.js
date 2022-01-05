const express = require("express");
const router = express.Router();

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const User = require("../models/User");
const cloudinary = require("cloudinary");

router.post("/user/signup", async (req, res) => {
  try {
    if (req.fields.username === undefined) {
      res.status(400).json({ message: "Missing parameter(s)" });
    } else {
      const isUserExist = await User.findOne({ email: req.fields.email });
      if (isUserExist !== null) {
        res.status(400).json({ message: "This email already has an account" });
      } else {
        const salt = uid2(64);
        const hash = SHA256(req.fields.password + salt).toString(encBase64);
        const token = uid2(64);

        const newUser = new User({
          email: req.fields.email,
          account: {
            username: req.fields.username,
            phone: req.fields.phone,
          },
          token: token,
          hash: hash,
          salt: salt,
        });

        if (req.fields.picture) {
          const resultPicture = await cloudinary.uploader.upload(
            req.fields.pictures.path
          );
          newUser.product_image = resultPicture;
        }

        await newUser.save();
        res.json({
          _id: newUser._id,
          email: newUser.email,
          token: newUser.token,
          account: newUser.account,
        });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});