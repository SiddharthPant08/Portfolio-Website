import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.warn("⚠️  MONGO_URI is not set. Starting without a database connection.");
    return false;
  }

  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    return false;
  }
};