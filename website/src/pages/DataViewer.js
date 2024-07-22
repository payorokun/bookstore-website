import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useMsal, useIsAuthenticated, useAccount } from '@azure/msal-react';
import { loginRequest } from '../authConfig';
import './DataViewer.css';
import { Tooltip } from 'react-tooltip';

const DataViewer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const account = useAccount(accounts[0] || {});

  const fetchData = useCallback(async () => {
    if (!isAuthenticated || !account) {
      setError('User is not logged in');
      setLoading(false);
      return;
    }

    const tokenRequest = {
      ...loginRequest,
      account: account
    };

    try {
      const response = await instance.acquireTokenSilent(tokenRequest);
      const token = response.accessToken;
      console.log(token);

      const apiResponse = await axios.get('https://sailpoint-apigateway.azure-api.net/read/BooksReader', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setData(apiResponse.data);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Unauthorized. Please log in again.');
      } else {
        setError('Error fetching data');
      }
      setLoading(false);
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [instance, accounts, isAuthenticated, account, fetchData]);

  const handleReload = () => {
    setData([]);
    setLoading(true);
    setError('');
    fetchData();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Data Viewer</h2>
      <button onClick={handleReload}>Reload</button>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Author</th>
            <th>Title</th>
            <th>Genre</th>
            <th>Price</th>
            <th>Publish Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.author}</td>
              <td>{book.title}</td>
              <td>{book.genre}</td>
              <td>{book.price}</td>
              <td>{new Date(book.publishDate).toLocaleDateString()}</td>
              <td className="ellipsis-cell" data-tooltip-id={`tooltip-${book.id}`} data-tooltip-content={book.description}>
                {book.description}
              </td>
              <Tooltip id={`tooltip-${book.id}`} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataViewer;
