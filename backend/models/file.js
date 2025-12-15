import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  name: String,
  size: Number,
  hash: { type: String, unique: true }, // 👈 IMPORTANT
  url: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("File", fileSchema);
