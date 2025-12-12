import React, { useState } from "react";

const API = "http://localhost:5000/api/files";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) {
      setStatus("Please select a file");
      return;
    }

    const form = new FormData();
    form.append("file", file);

    setStatus("Uploading...");

    const res = await fetch(API + "/upload", {
      method: "POST",
      body: form
    });

    const data = await res.json();

    if (data.duplicate) {
      setStatus("Duplicate Found! File already exists.");
    } else {
      setStatus("File uploaded successfully.");
      window.dispatchEvent(new Event("refreshFiles"));
    }
  }

  return (
    <div className="card">
      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
      <p>{status}</p>
    </div>
  );
}