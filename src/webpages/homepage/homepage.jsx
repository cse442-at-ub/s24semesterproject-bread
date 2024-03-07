import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import
import NavBar from '../navBar/NavBar';
import SearchIcon from '../../images/search_icon.png';
import './homepage.css'; // Ensure this path is correct

const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Updated to useNavigate

  const handleSearch = () => {
    // Use navigate to change the URL
    navigate(`/professor/${searchTerm}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
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
            onKeyDown={handleKeyDown} // Add this line
          />
          <button className="search-button" onClick={handleSearch}>
            <img src={SearchIcon} alt="Search" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
