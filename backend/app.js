const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
// ! database connections
mongoose.connect(
  process.env.MONGO_URL,
  () => {
    console.log("DB connected");
  },
  { useNewUrlParser: true }
);

// all the routes
const postRoutes = require("./routers/post");

// middleWares
app.use(morgan("dev"));

app.use("/", postRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("app Started at port", PORT);
});
