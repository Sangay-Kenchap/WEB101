import { useState } from 'react';
import axios from 'axios';
import Dropzone from '../component/Dropzone'; // adjust path if needed

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export default function Home() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!file) return alert('Select a file first');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/upload`,
        formData,
        {
          onUploadProgress: (event) => {
            setProgress(
              Math.round((event.loaded * 100) / event.total)
            );
          },
        }
      );

      setUploadedFile(res.data);
      setFile(null);
      setProgress(0);
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.error || 'Upload failed');
    }
  };

  return (
    <div
      style={{
        width: 500,
        margin: '60px auto',
        textAlign: 'center',
        padding: '25px',
        borderRadius: '15px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
        backgroundColor: '#ffffff'
      }}
    >
      <h1 style={{ marginBottom: '20px' }}>File Upload</h1>

      <Dropzone setFile={setFile} />

      <form onSubmit={onSubmit}>
        <button
          disabled={!file}
          style={{
            padding: '10px 20px',
            backgroundColor: file ? '#6366F1' : '#9CA3AF',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: file ? 'pointer' : 'not-allowed'
          }}
        >
          Upload
        </button>
      </form>

      {progress > 0 && (
        <p style={{ marginTop: '15px', color: '#6366F1' }}>
          Uploading: {progress}%
        </p>
      )}

      {uploadedFile && (
        <p style={{ marginTop: '15px' }}>
          Uploaded:{' '}
          <a
            href={`${BACKEND_URL}${uploadedFile.url}`}
            target="_blank"
            style={{ color: '#2563EB' }}
          >
            {uploadedFile.filename}
          </a>
        </p>
      )}
    </div>
  );
}