const express = require("express");
const router = express.Router();
const User = require("../models/user");
// const { NotFoundError, BadRequestError } = require("../utils/errors");

router.post("/login", async (req, res, next) => {
  try {
    // take the users email and password and attempting to authenticate them
    const user = await User.login(req.body);
    return res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    // take the users email, password, rsvp status, and the number of guests
    // and create a new user in our database
    const user = await User.register(req.body);
    return res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
