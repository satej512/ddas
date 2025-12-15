import express from "express";
import File from "../models/file.js";
import upload from "../utils/upload.js";
import { generateHash } from "../utils/hash.js";

const router = express.Router();

// Upload Route (Cloudinary)
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const fileUrl = req.file.path;        // Cloudinary URL
    const publicId = req.file.filename;   // Cloudinary public_id

    // generate hash from publicId (stable)
    const hash = generateHash(Buffer.from(publicId));

    const existing = await File.findOne({ hash });
    if (existing) {
      return res.json({ duplicate: true, message: "Duplicate File Found!" });
    }

    const newFile = new File({
      name: req.file.originalname,
      size: req.file.size,
      hash,
      url: fileUrl,   // ✅ SAVE URL
    });

    await newFile.save();

    res.json({
      duplicate: false,
      message: "File uploaded successfully!",
      url: fileUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
});

// Get All Files
router.get("/", async (req, res) => {
  const files = await File.find();
  res.json(files);
});

export default router;
