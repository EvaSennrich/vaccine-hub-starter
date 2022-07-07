const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

// const storeRouter = require("./routes/store");
const { BadRequestError, NotFoundError } = require("./utils/errors");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());
// app.use("/store", storeRouter);

app.use((req, res, next) => {
  return next(new NotFoundError());
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({ error: { message, status } });
});

module.exports = app;
