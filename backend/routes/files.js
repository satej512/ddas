import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import File from "../models/file.js";
import { generateHash } from "../utils/hash.js";

const router = express.Router();
const upload = multer({ dest: "backend/uploads/" });

// Upload Route
router.post("/upload", upload.single("file"), async (req, res) => {
  const fileBuffer = fs.readFileSync(req.file.path);
  const hash = generateHash(fileBuffer);

  const existing = await File.findOne({ hash });

  if (existing) {
    fs.unlinkSync(req.file.path);
    return res.json({ duplicate: true, message: "Duplicate File Found!" });
  }

  const newFile = new File({
    name: req.file.originalname,
    size: req.file.size,
    hash,
    path: req.file.path
  });

  await newFile.save();

  res.json({ duplicate: false, message: "File Uploaded Successfully!" });
});

// Get All Files
router.get("/", async (req, res) => {
  const files = await File.find();
  res.json(files);
});

export default router;
