import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_WOOLY_URI);
    console.log('database connected');
    return conn;
  } catch (error) {
    console.log('database error');
    return null;
  }
};

export default dbConnect;
