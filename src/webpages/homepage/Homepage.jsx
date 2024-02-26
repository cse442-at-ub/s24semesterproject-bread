import React from 'react';
import NavBar from '../navBar/NavBar';
import SearchIcon from '../../images/search_icon.png';
import './Homepage.css'; // Make sure the path is correct based on your project structure

const Homepage = () => {
  return (
    <div>
      <NavBar />
      <div className="content-container">
        <div className="text-container">
          <p className="intro-text" type="text">I want to get to know ...</p>
        </div>

        <div className="search-container">
          <input className="search-input" type="text" placeholder="Enter a Professor"/>
          <button className="search-button">
            <img src={SearchIcon} alt="Search"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
