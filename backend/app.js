/*
author: Arnob Islam
date: '14-12-21' 
description: ''
*/

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}

mongoose
  .connect(process.env.MONGODB_DATABASE_URI)
  .then(() => {
    console.log("server connected success...");
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

// use this on playground
// app.use(cors());

// use this on client
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
// front-end
app.use("/", express.static(path.join(__dirname, "../frontend/build")));
// front-end index file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

module.exports = app;
