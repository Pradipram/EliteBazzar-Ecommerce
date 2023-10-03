import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  userId:{
    type : String,
    required :true,
  },
  url: {
    type: String,
    required: true,
  },
  detailUrl: {
    type: String,
    required: true,
  },
  title: {
    shortTitle: {
      type: String,
      required: true,
    },
    longTitle: {
      type: String,
      required: true,
    },
  },
  price: {
    mrp: {
      type: Number,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    discount: {
      type: String,
      default: 0,
    },
    description: {
      type: String,
    },
    discount: {
      type: String,
    },
    tagline: {
      type: String,
    },
  },
});

export const Cart = mongoose.model("Cart", cartSchema);
