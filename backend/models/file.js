import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  name: String,
  size: Number,
  hash: String,
  url: String, // 👈 Cloudinary URL
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("File", fileSchema);
