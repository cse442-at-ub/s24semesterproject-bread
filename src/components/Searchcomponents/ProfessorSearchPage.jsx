import React, { useState } from 'react';
import SearchIcon from './search_icon.png';
import './Search.css';
import unknownImage from './Unknown.jpeg';
import './ProfessorSearchResult.css';

const ProfessorSearchPage = () => {
  const [query, setQuery] = useState('');
  const [professors, setProfessors] = useState([
    {
      name: 'John Doe',
      photoUrl: unknownImage,
      courses: ['BIO101: Introduction to Biology', 'PHY411: Advanced Physics'],
      nextSemesterCourses: ['BIO202: Advanced Biology', 'PHY512: Quantum Mechanics'],
      department: 'Science',
    },
    {
      name: 'John Doe',
      photoUrl: unknownImage,
      courses: ['ART201: History of Art', 'APY213: Literature and Society'],
      nextSemesterCourses: ['ART302: Renaissance Art', 'APY325: Modern Literature'],
      department: 'Humanities',
    },
  ]);

  const handleSearch = (query) => {
    console.log("Search query:", query);
    // You can implement search functionality here and update the professors state accordingly
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  };

  const ProfessorSearchResult = ({ name, photoUrl, courses, nextSemesterCourses, department }) => {
    return (
      <div className="professor-search-result">
        <div className="left-section">
          <img src={photoUrl} alt={name} className="professor-photo" />
        </div>
        <div className="right-section">
          <h2 className="professor-name">{name}</h2>
          <div className="info-section">
            <p className="professor-department">Department: {department}</p>
            <div className="courses-section">
              <div className="courses-taught">
                <h3 className="courses-header">Teaching courses presently:</h3>
                <p className="courses-list">
                  {courses.join('; ')}
                </p>
              </div>
              <div className="next-semester-courses">
                <h3 className="courses-header">Next semester courses:</h3>
                <p className="courses-list">
                  {nextSemesterCourses.join('; ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      <p className="intro-text">I want to get to know ...</p>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter a Professor"
          value={query}
          onChange={handleChange}
          className="search-input"
        />
        <button onClick={handleSubmit} className="search-button">
          <img src={SearchIcon} alt="Search" />
        </button>
      </div>
      <h1 style={{ fontFamily: 'Crimison text', fontSize: 'calc(1.75vw + 1.75vh)', fontWeight: 'bold', color: '#000' }}>
        Professor Search Results:</h1>
      {professors.map((professor, index) => (
        <ProfessorSearchResult
          key={index}
          name={professor.name}
          photoUrl={professor.photoUrl}
          courses={professor.courses}
          nextSemesterCourses={professor.nextSemesterCourses}
          department={professor.department}
        />
      ))}
    </div>
  );
};

export default ProfessorSearchPage;
