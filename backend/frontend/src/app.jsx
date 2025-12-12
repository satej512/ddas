import React from 'react';
import UploadForm from './components/UploadForm';
import FileList from './components/FileList';

export default function App() {
  return (
    <div className="container">
      <h1>Data Download Duplication Alert System</h1>
      <UploadForm />
      <FileList />
    </div>
  );
}
