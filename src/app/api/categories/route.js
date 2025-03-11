// app/categories/route.js

import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Category } from '@/models/store';

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

// API Route to fetch all categories
export async function GET() {
  await connectDB(); // Connect to MongoDB on each request

  try {
    const categories = await Category.find();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to fetch categories' }, { status: 500 });
  }
}

// API Route to create a new category
export async function POST(request) {
  await connectDB(); // Connect to MongoDB on each request

  try {
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json({ message: 'Category name is required' }, { status: 400 });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return NextResponse.json({ message: 'Category already exists' }, { status: 400 });
    }

    const newCategory = new Category({ name });
    await newCategory.save();

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to create category' }, { status: 500 });
  }
}
