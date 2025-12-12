import { Link, Outlet } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className="layout-container">
      
      {/* LEFT SIDEBAR */}
      <div className="sidebar">
        <h2 className="logo">DDAS</h2>

        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/dashboard/upload">Upload Files</Link></li>
          <li><Link to="/dashboard/files">List Files</Link></li>
          <li><Link to="/dashboard/settings">Settings</Link></li>
        </ul>
      </div>

      {/* RIGHT CONTENT AREA */}
      <div className="content-area">
        <Outlet />
      </div>

    </div>
  );
}

