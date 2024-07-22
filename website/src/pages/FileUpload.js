// 'https://sailpoint-apigateway.azure-api.net/FileUploader'
// src/pages/FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const { acquireTokenSilent } = useAuth();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage('Uploading file...');

    try {
      const token = await acquireTokenSilent();
      console.log('Token:', token);

      const formData = new FormData();
      formData.append('file', file);

      await axios.post('https://sailpoint-apigateway.azure-api.net/api/FileUploader', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      setFile(null);
      setMessage('File uploaded successfully');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage('Unauthorized. Please log in again.');
      } else {
        setMessage('Error uploading file');
        console.log('Error uploading file:', error);
      }
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={!file}>Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FileUpload;
