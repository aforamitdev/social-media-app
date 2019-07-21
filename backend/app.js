const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");

// ! database connections

// all the routes
const postRoutes = require("./routers/post");

// middleWares
app.use(morgan("dev"));

app.use("/", postRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("app Started at port", PORT);
});
