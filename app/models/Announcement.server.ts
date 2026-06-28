import mongoose from "mongoose";
import { connectMongo } from "../db-mongo.server";

const announcementSchema = new mongoose.Schema({
  text: { type: String, required: true },
  shop: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Announcement =
  mongoose.models.Announcement ||
  mongoose.model("Announcement", announcementSchema);

export async function saveAnnouncement(shop: string, text: string) {
  await connectMongo();
  return Announcement.create({ shop, text });
}
