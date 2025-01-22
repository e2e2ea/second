import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_COLES_URI);
    console.log('database connected');
    return conn;
  } catch (error) {
    console.log('database error');
    return null
  }
};

export default dbConnect;
