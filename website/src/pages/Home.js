import React from 'react';
import FileUpload from './FileUpload';
import DataViewer from './DataViewer';
import { useIsAuthenticated } from '@azure/msal-react';
import './Home.css';

const Home = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className="home-container">
      {isAuthenticated ? (
        <>
          <div className="file-upload-column">
            <FileUpload />
          </div>
          <div className="data-viewer-column">
            <DataViewer />
          </div>
        </>
      ) : (
        <p>Please log in to access the features.</p>
      )}
    </div>
  );
};
export default Home;
