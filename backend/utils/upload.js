import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(), // 👈 REQUIRED for hashing
});

export default upload;
