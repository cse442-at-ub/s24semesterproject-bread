// src/webpages/homepage/Homepage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Homepage.css';
import Logo from "/Users/jiewen/Documents/GitHub/s24semesterproject-bread/src/images/Logo.png";
import MenuIcon_White from "/Users/jiewen/Documents/GitHub/s24semesterproject-bread/src/images/menu(white).png";
import searchIcon from "/Users/jiewen/Documents/GitHub/s24semesterproject-bread/src/images/search_icon.png";

const HeaderBar = () => {
    const navigate = useNavigate(); // Use the useNavigate hook

    const handleMenuClick = () => {
        navigate('/account_Settings'); // Navigate to account settings page on click
    };

    return ( 
      <div className="header-bar">
        <img src={Logo} alt="InSight Logo" className="logo" />
        <img src={MenuIcon_White} alt="Menu" className="menu-icon" onClick={handleMenuClick} /> {/* Add onClick event */}
      </div>
    );
};

// This is the main component for the search functionality
const SearchComponent = () => {
  // State to keep track of the search term
  const [searchTerm, setSearchTerm] = useState('');

  // Event handler for input changes
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Event handler for form submission
  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission action
    // Here you could call an API or do something with the search term
    console.log(`Search for: ${searchTerm}`);
  };

  return (
    <div className="search-container">
      <HeaderBar />
      <h1 className="search-header">I want to get to know...</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          className="search-input"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Enter the Professor"
        />
        <button
          className="search-button"
          type="submit"
        >
          {/* Use an img tag if you want to add an icon inside the button */}
          <img src={searchIcon} alt="Search" />
        </button>
      </form>
    </div>
  );
};

export default SearchComponent;
