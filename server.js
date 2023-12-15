require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3100;
const connectDB = require('./config/db.js');
const mongoose = require('mongoose');

const menu_itemRouter = require("./routes/menu_item");
const employeeRouter = require("./routes/employee");

connectDB();

app.use(cors());

// Built in middleware functions in express
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);


app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

// API Route
app.use("/menu_items", menu_itemRouter);
app.use("/employees", employeeRouter);


/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

mongoose.connection.once('open', () => {
  console.log("Connected to mongoDB");
  app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
  });
})


