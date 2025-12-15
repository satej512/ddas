import express from "express";
import File from "../models/file.js";
import upload from "../utils/upload.js";
import { generateHash } from "../utils/hash.js";

const router = express.Router();

// Upload Route (Cloudinary)
router.post("/upload", upload.single("file"), async (req, res) => {
  const fileUrl = req.file.path; // Cloudinary URL
  const fileBuffer = Buffer.from(fileUrl);
  const hash = generateHash(fileBuffer);

  const existing = await File.findOne({ hash });
  if (existing) {
    return res.json({ duplicate: true, message: "Duplicate File Found!" });
  }

  const newFile = new File({
    name: req.file.originalname,
    size: req.file.size,
    hash,
    path: fileUrl, // Cloudinary URL
  });

  await newFile.save();

  res.json({
    duplicate: false,
    message: "File uploaded to Cloudinary successfully!",
    url: fileUrl,
  });
});

// Get All Files
router.get("/", async (req, res) => {
  const files = await File.find();
  res.json(files);
});

export default router;
