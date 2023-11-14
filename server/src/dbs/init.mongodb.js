import mongoose from "mongoose";
import dotenv from "dotenv"
 
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      maxPoolSize: 10,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
}; 

export default connectMongoDB;
