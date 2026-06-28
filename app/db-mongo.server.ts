import mongoose from "mongoose";

let isConnected = false;

export async function connectMongo() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
  isConnected = true;
  console.log("MongoDB connected");
}
