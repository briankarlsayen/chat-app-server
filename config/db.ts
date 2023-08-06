import mongoose from 'mongoose';
const COLLECTION = "socket.io-adapter-events";

export const connectDB = async () => {
  if (process.env.MONGODB_URI) {
    mongoose.set('strictQuery', false);
    const mongoConn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB is Connected`);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    createAdapterCol(db)
    return db
  } else {
    console.log('Unable to connect to datasbase');
  }
};

const createAdapterCol = async (conn: any) => {
  console.log('create')
  try {
    await conn.createCollection(COLLECTION, {
      capped: true,
      size: 1e6
    });
  } catch (e) {
    // console.log('e', e)
    // collection already exists
  }
}
