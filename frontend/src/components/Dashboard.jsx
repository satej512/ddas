import React from "react";
import UploadForm from "./UploadForm";
import FileList from "./filelist";
import "./dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to DDAS Dashboard</h1>

      <UploadForm />
      <FileList />
    </div>
  );
}
