import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

export default function Home() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm();

  // ── Dropzone ──────────────────────────────
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'application/pdf': ['.pdf']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        // Register the file with react-hook-form
        setValue('file', acceptedFiles, { shouldValidate: true });

        // Set preview based on file type
        if (file.type.startsWith('image/')) {
          const previewUrl = URL.createObjectURL(file);
          setFilePreview({ url: previewUrl, name: file.name, type: file.type });
        } else if (file.type === 'application/pdf') {
          setFilePreview({ name: file.name, type: file.type });
        } else {
          setFilePreview(null);
        }
      }
    },
    onDropRejected: (rejectedFiles) => {
      const error = rejectedFiles[0]?.errors[0];
      if (error?.code === 'file-too-large') {
        setUploadResult({ success: false, message: 'File is too large. Maximum size is 5MB.' });
      } else if (error?.code === 'file-invalid-type') {
        setUploadResult({ success: false, message: 'Invalid file type. Only JPEG, PNG, and PDF allowed.' });
      }
    }
  });

  // ── Submit Handler ────────────────────────
  const onSubmit = async (data) => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadResult(null);

    try {
      const formData = new FormData();
      formData.append('file', data.file[0]);
      formData.append('name', data.name);

      console.log('Uploading:', data.file[0].name, '| Type:', data.file[0].type);

      const response = await axios.post('http://localhost:8000/api/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentage);
        }
      });

      setUploadResult({
        success: true,
        message: 'File uploaded successfully!',
        data: response.data
      });
    } catch (error) {
      console.error('Upload error:', error);
      setUploadResult({
        success: false,
        message: error.response?.data?.error || 'Upload failed'
      });
    } finally {
      setIsUploading(false);
    }
  };

  // ── Reset Form ────────────────────────────
  const handleReset = () => {
    reset();
    setFilePreview(null);
    setUploadResult(null);
    setUploadProgress(0);
  };

  // ── Render ────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-md w-full max-w-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          File Upload
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              {...register('name', { required: 'Name is required' })}
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 
                        text-sm 
                        text-gray-900                  {/* ← This makes typed text black */}
                        placeholder:text-gray-400      {/* ← This controls placeholder color */}
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Dropzone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select File
            </label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                ${isDragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                }`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-blue-500 text-sm">Drop the file here...</p>
              ) : (
                <div>
                  <p className="text-gray-500 text-sm">
                    Drag & drop a file here, or{' '}
                    <span className="text-blue-500 font-medium">click to select</span>
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    JPEG, PNG, PDF — max 5MB
                  </p>
                </div>
              )}
            </div>
            {/* Hidden input for validation */}
            <input
              type="hidden"
              {...register('file', { required: 'Please select a file' })}
            />
            {errors.file && (
              <p className="text-red-500 text-xs mt-1">{errors.file.message}</p>
            )}
          </div>

          {/* File Preview */}
          {filePreview && (
            <div className="border rounded-lg p-3">
              <p className="text-sm font-medium text-gray-600 mb-2">Preview:</p>
              {filePreview.type?.startsWith('image/') ? (
                <img
                  src={filePreview.url}
                  alt={filePreview.name}
                  className="max-w-full h-auto max-h-40 rounded"
                />
              ) : filePreview.type === 'application/pdf' ? (
                <div className="flex items-center gap-2 bg-gray-100 rounded p-2">
                  <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z"/>
                    <path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/>
                  </svg>
                  <span className="text-sm text-gray-700 truncate">{filePreview.name}</span>
                </div>
              ) : (
                <p className="text-sm text-gray-600">File selected: {filePreview.name}</p>
              )}
            </div>
          )}

          {/* Progress Bar */}
          {isUploading && (
            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Result Message */}
          {uploadResult && (
            <div className={`rounded-lg p-3 text-sm ${
              uploadResult.success
                ? 'bg-green-50 border border-green-200 text-green-700'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              <p className="font-medium">{uploadResult.message}</p>
              {uploadResult.success && uploadResult.data && (
                <ul className="mt-2 text-xs space-y-1 text-green-600">
                  <li>📄 Name: {uploadResult.data.originalName}</li>
                  <li>📦 Size: {(uploadResult.data.size / 1024).toFixed(1)} KB</li>
                  <li>🔗 URL: <a href={`http://localhost:8000${uploadResult.data.url}`} target="_blank" rel="noreferrer" className="underline">View file</a></li>
                </ul>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isUploading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors"
            >
              {isUploading ? 'Uploading...' : 'Upload File'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg text-sm transition-colors"
            >
              Reset
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}