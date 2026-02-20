import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    try {
      cached.promise = mongoose.connect(MONGODB_URL, {
        dbName: "wheelworks",
        bufferCommands: false,
      });
    } catch (err) {
      cached.promise = null;
      throw err;
    }
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null; // reset so retry works
    throw err;
  }

  return cached.conn;
};
