import express from "express";
import File from "../models/file.js";
import upload from "../utils/upload.js";
import cloudinary from "../utils/cloudinary.js";
import crypto from "crypto";

const router = express.Router();

// UPLOAD FILE
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // 1️⃣ Create hash from file bytes
    const hash = crypto
      .createHash("sha256")
      .update(req.file.buffer)
      .digest("hex");

    // 2️⃣ Check duplicate BEFORE Cloudinary
    const existing = await File.findOne({ hash });
    if (existing) {
      return res.json({
        duplicate: true,
        message: "Duplicate file already exists",
      });
    }

    // 3️⃣ Upload to Cloudinary (image + audio + video)
    cloudinary.uploader
      .upload_stream(
        {
          folder: "ddas_uploads",
          resource_type: "auto", // 🔥 VERY IMPORTANT (fixes audio)
        },
        async (error, result) => {
          if (error) {
            console.error(error);
            return res
              .status(500)
              .json({ message: "Cloudinary upload failed" });
          }

          // 4️⃣ Save to MongoDB
          const newFile = new File({
            name: req.file.originalname,
            size: req.file.size,
            hash,
            url: result.secure_url,
          });

          await newFile.save();

          return res.json({
            duplicate: false,
            message: "File uploaded successfully",
            url: result.secure_url,
          });
        }
      )
      .end(req.file.buffer); // 👈 send file bytes
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
});

// GET FILES
router.get("/", async (req, res) => {
  const files = await File.find().sort({ createdAt: -1 });
  res.json(files);
});

export default router;
