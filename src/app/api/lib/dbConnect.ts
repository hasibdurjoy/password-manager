// lib/dbConnect.ts
import mongoose from "mongoose";

const MONGODB_URI: string = "mongodb+srv://password_manager:NrfAMibolEUqWIlf@cluster0.yohkm.mongodb.net/passwordManager?retryWrites=true&w=majority";
// "mongodb://127.0.0.1:27017/passwordManager?readPreference=primary&appname=MongoDB%20Compass&directConnection=true";
  

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        //@ts-ignore
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((mongoose) => {
        return mongoose;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
