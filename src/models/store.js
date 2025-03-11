// @/models/store.js

import mongoose from 'mongoose';

// Tag Schema
const tagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

export const Tag = mongoose.model("Tag", tagSchema);

// Category Schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

export const Category = mongoose.model("Category", categorySchema);

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  img: { type: String, required: false },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag", required: false }], // Referencing Tag schema
});

export const Product = mongoose.model("Product", productSchema);
