import express from "express";
import File from "../models/file.js";
import upload from "../utils/upload.js";

const router = express.Router();

// Upload Route (Cloudinary)
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // Cloudinary gives these automatically
    const fileUrl = req.file.path;        // secure_url
    const publicId = req.file.filename;   // Cloudinary public_id

    // Check duplicate using Cloudinary public_id
    const existing = await File.findOne({ hash: publicId });
    if (existing) {
      return res.json({
        duplicate: true,
        message: "Duplicate File Found!",
      });
    }

    const newFile = new File({
      name: req.file.originalname,
      size: req.file.size,
      hash: publicId,     // use public_id as hash
      path: fileUrl,      // Cloudinary URL
    });

    await newFile.save();

    res.json({
      duplicate: false,
      message: "File uploaded to Cloudinary successfully!",
      url: fileUrl,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Files
router.get("/", async (req, res) => {
  const files = await File.find();
  res.json(files);
});

export default router;
