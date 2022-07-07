const express = require("express");
const router = express.Router();
// const app = require("../app");
// const store = require("../model/store");
// const { NotFoundError, BadRequestError } = require("../utils/errors");

router.post("/login", async (req, res, next) => {
  try {
    // take the users email and password and attempting to authenticate them
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    // take the users email, password, rsvp status, and the number of guests
    // and create a new user in our database
  } catch (err) {
    next(err);
  }
});

module.exports = router;
