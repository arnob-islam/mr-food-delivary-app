/*
author:'Arnob Islam'
created date:'10/1/22'
description:''
*/

const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema(
  {
    foodName: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
    },
    thumb: {
      type: String,
      required: true,
    },
    // public id for get cloudinary photo
    publicId: {
      type: String,
    },
    catagory: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    star: {
      type: Number,
      default: 0,
    },
    starCount: [
      {
        type: Number,
      },
    ],
    recipe: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Food = mongoose.model("foods", FoodSchema);

module.exports = Food;
