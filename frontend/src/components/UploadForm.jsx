import React, { useState } from "react";
import axios from "axios";

const API = "https://ddas.onrender.com/api/files";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);

  async function handleUpload(e) {
    e.preventDefault();

    if (!file) {
      setStatus("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setStatus("Uploading...");
    setProgress(0);

    try {
      const res = await axios.post(API + "/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percent);
        },
      });

      if (res.data.duplicate) {
        setStatus("❌ Duplicate file already exists");
      } else {
        setStatus("✅ File uploaded successfully");
        window.dispatchEvent(new Event("refreshFiles"));
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Upload failed");
    }
  }

  return (
    <div className="card">
      <form onSubmit={handleUpload}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>

      {/* STATUS MESSAGE */}
      <p>{status}</p>

      {/* PROGRESS BAR */}
      {progress > 0 && progress < 100 && (
        <div style={{ marginTop: "10px" }}>
          <div
            style={{
              width: "100%",
              background: "#ddd",
              borderRadius: "5px",
              height: "10px",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "10px",
                background: "#4caf50",
                borderRadius: "5px",
              }}
            />
          </div>
          <p>{progress}%</p>
        </div>
      )}
    </div>
  );
}
