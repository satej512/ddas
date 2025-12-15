import React from "react";
import "./dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to DDAS Dashboard</h1>

      <div className="upload-box">
        <h2>Upload Your Files</h2>
        <p>Your files will be securely stored and displayed beautifully.</p>
        <a href="/dashboard/upload">
          <button className="upload-btn">Upload Now</button>
        </a>
      </div>
    </div>
  );
}