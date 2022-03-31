/*
author:'Arnob Islam'
created date:'10/1/22'
description:''
*/

const mongoose = require("mongoose");

const FoodOrderSchema = new mongoose.Schema(
  {
    foodItems: [
      {
        foodId: {
          type: String,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],

    userId: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      default: "pending",
    },

    paymentInfo: {
      complete: {
        type: Boolean,
      },
      card: {
        // like visa , master
        brand: {
          type: String,
        },
        // this david card cradit card
        funding: {
          type: String,
        },
        // this two is for stripe pyment mathods
        client_secret: {
          type: String,
        },
        // stripe payment id
        id: {
          type: String,
        },
      },
    },

    shippingInfo: {
      area: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
      tel: {
        type: String,
        required: true,
      },
      note: {
        type: String,
        required: true,
      },
    },

    delivered: {
      type: Boolean,
      default: false,
    },
    rejected: {
      type: Boolean,
      default: false,
    },
    rated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const FoodOrder = mongoose.model("food-order", FoodOrderSchema);

module.exports = FoodOrder;
