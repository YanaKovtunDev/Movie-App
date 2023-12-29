import mongoose from 'mongoose';
require('../models/user.model');
require('../models/movie.model');

export const connectToDB = async () => {
  if (!process.env.MONGODB_URL) return console.log('MONGODB_URL not found');
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
};
