import { useCallback } from 'react';

export default function Dropzone({ setFile }) {
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const uploaded = e.dataTransfer.files[0];
    setFile(uploaded);
  }, [setFile]);

  const handleChange = (e) => setFile(e.target.files[0]);

  return (  
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      style={{
        border: '2px dashed #6366F1',
        backgroundColor: '#F3F4F6',
        padding: '30px',
        marginBottom: '20px',
        borderRadius: '12px',
        textAlign: 'center',
        cursor: 'pointer'
      }}
    >
      <p style={{ color: '#374151', fontWeight: '500' }}>
        Drag & drop or click to upload
      </p>

      <input 
        type="file" 
        onChange={handleChange}
        style={{ marginTop: '10px' }}
      />
    </div>
  );
}