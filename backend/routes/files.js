import express from "express";
import File from "../models/file.js";
import { generateHash } from "../utils/hash.js";
import upload from "../utils/upload.js";

const router = express.Router();

// Upload Route (Cloudinary)
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // Cloudinary gives secure URL here
    const fileUrl = req.file.path;

    // Generate hash (simple version)
    const hash = generateHash(Buffer.from(fileUrl));

    const existing = await File.findOne({ hash });

    if (existing) {
      return res.json({
        duplicate: true,
        message: "Duplicate File Found!",
        fileUrl: existing.url,
      });
    }

    const newFile = new File({
      name: req.file.originalname,
      size: req.file.size,
      hash,
      url: fileUrl, // ✅ Cloudinary URL
    });

    await newFile.save();

    res.json({
      duplicate: false,
      message: "File Uploaded Successfully!",
      fileUrl,
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
