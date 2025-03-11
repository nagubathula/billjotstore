// app/products/route.js

import { json } from 'body-parser';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Tag, Category, Product } from '@/models/store';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/rbacProject', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// API Route to fetch all products
export async function GET() {
  await connectDB(); // Connect to MongoDB on each request

  try {
    const products = await Product.find().populate('categories').populate('tags');
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to fetch products' }, { status: 500 });
  }
}
