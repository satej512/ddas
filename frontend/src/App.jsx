import "./styles.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./components/Dashboard";
import UploadForm from "./components/UploadForm";
import FileList from "./components/FileList";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard Layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="upload" element={<UploadForm />} />
          <Route path="files" element={<FileList />} />
          <Route path="settings" element={<h2 style={{color:"white"}}>Settings Coming Soon</h2>} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
