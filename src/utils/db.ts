import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://emineme02:L575M01ZueUvNBq2@cluster0.mj5cl4f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&socketTimeoutMS=5000&serverSelectionTimeoutMS=5000');
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};