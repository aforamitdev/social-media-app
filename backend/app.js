const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const valid = require("express-validator");
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

//* middleWares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(valid());
app.use("/", postRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("app Started at port", PORT);
});
