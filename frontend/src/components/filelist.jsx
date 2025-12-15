import React, { useEffect, useState } from "react";

const API = "https://ddas.onrender.com/api/files";

export default function FileList() {
  const [files, setFiles] = useState([]);

  async function loadFiles() {
    const res = await fetch(API);
    const data = await res.json();
    setFiles(data);
  }

  useEffect(() => {
    loadFiles();
    window.addEventListener("refreshFiles", loadFiles);

    return () => {
      window.removeEventListener("refreshFiles", loadFiles);
    };
  }, []);

  return (
    <div className="card">
      <h2>Uploaded Files</h2>

      {files.length === 0 && <p>No files uploaded yet.</p>}

      {files.map((f) => (
        <div key={f._id} className="file-row">
          <p><strong>{f.name}</strong></p>

          <a href={f.url} target="_blank" rel="noreferrer">
            View File
          </a>

          <p>{new Date(f.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
