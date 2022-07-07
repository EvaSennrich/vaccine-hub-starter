const app = require("./app");
const { PORT } = require("./config");

// const port = process.env.PORT || 3001;

// app.listen(PORT, () => {
//   console.log(`🚀 Server listening on port ` + PORT);
// });

app.listen(PORT, () => {
  console.log(`🚀 Server running http://localhost:${PORT}`);
});
