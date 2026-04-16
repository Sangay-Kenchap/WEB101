"use client";

import axios from "axios";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      setFile(acceptedFiles[0]);
    },
  });

  const uploadFile = async () => {
    if (!file) {
      alert("Select a file first");
      return;
    }

    // File size validation (2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("File too large (max 2MB)");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("/api/upload", formData, {
        onUploadProgress: (data) => {
          setProgress(Math.round((data.loaded * 100) / (data.total || 1)));
        },
      });

      alert("Upload successful");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>File Upload</h2>

      <div
        {...getRootProps()}
        style={{
          border: "2px dashed gray",
          padding: 20,
          marginBottom: 10,
        }}
      >
        <input {...getInputProps()} />
        <p>Drag & drop file OR click</p>
      </div>

      <button onClick={uploadFile}>Upload</button>

      <p>Progress: {progress}%</p>
    </div>
  );
}
