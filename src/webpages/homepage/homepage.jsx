import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../navBar/NavBar';
import SearchIcon from '../../images/search_icon.png';
import './homepage.css';

const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('professors'); // Default filter by professors
  const [searchError, setSearchError] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const webServerUrl = process.env.REACT_APP_WEB_SERVER_URL
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    if (searchTerm.trim() !== '') {

      fetch(`${apiUrl}/backend/searchFilter/searchFilter.php?query=${encodeURIComponent(searchTerm)}&filter=${filter}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data.length > 0) {
            navigate('/search', { state: { professors: data } });
          } else {
            setSearchError('No results found.');
          }
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
          setSearchError('Error fetching search results.');
        });
    }
  };

  return (
    <div>
      <NavBar />
      <div className="content-container">
        <div className="text-container">
          <p className="intro-text">I want to get to know ...</p>
        </div>

        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="Enter a Professor"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="professors">Filter by Professor</option>
            <option value="classes">Filter by Class</option>
          </select>
          <button className="search-button" onClick={handleSearch}>
            <img src={SearchIcon} alt="Search" />
          </button>
        </div>
        {searchError && <p>{searchError}</p>}
      </div>
    </div>
  );
};

export default Homepage;