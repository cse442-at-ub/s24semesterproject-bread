import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import SearchIcon from './search_icon.png';
import './Search.css';
import './ProfessorSearchResult.css';

const ProfessorSearchPage = ({ professors }) => {
  return (
    <div className="search-app">
      <p className="search-intro-text">I want to get to know ...</p>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter a Professor"
          className="search-search-input"
        />
        <button className="search-search-button">
          <img src={SearchIcon} alt="Search" />
        </button>
      </div>
      <h1 className="search-header">Professor Search Results:</h1>
      {professors.map((professor, index) => (
        <div key={index} className="search-professor-search-result">
          <div className="search-left-section">
            <img src={professor.pfppath} alt={professor.name} className="search-professor-photo" />
          </div>
          <div className="search-right-section">
            <h2 className="search-professor-name">
            
              {/* Create a Link to the professor's profile page */}
              <Link
              to={{
                pathname: `/professor/${professor.name+'+'+professor.department}`,
                }}
                >
                  {professor.name}
                  </Link>
            </h2>
            <div className="search-info-section">
              <p className="search-professor-department">Department: {professor.department}</p>
              <div className="search-courses-section">
                <div className="search-courses-taught">
                  <h3 className="search-courses-header">Teaching courses presently:</h3>
                  <p className="search-courses-list">{professor.classes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfessorSearchPage;
