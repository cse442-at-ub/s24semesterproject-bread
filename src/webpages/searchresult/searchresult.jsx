import React, { useState, useEffect } from 'react';
import ProfessorProfiles from '../../components/Searchcomponents/ProfessorSearchPage';
import NavBar from '../navBar/NavBar';
import { useLocation } from 'react-router-dom';

function Search() {
  const [professors, setProfessors] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Check if search results are available in location state
    if (location.state && location.state.professors) {
      // If available, set the professors state with the search results
      setProfessors(location.state.professors.map(({ professors, pfppath, ...rest }) => ({ name: professors, pfppath, ...rest })));
    } else {
      // If not available, fetch search results from the backend
      fetch('https://cors-anywhere.herokuapp.com/https://www-student.cse.buffalo.edu/CSE442-542/2024-Spring/cse-442ac/backend/searchFilter/?filter=professors')
        .then(response => response.json())
        .then(data => {
          console.log("Received data from backend:", data);
          setProfessors(data.map(({ professors, pfppath, ...rest }) => ({ name: professors, pfppath, ...rest })));
        })
        .catch(error => console.error('Error fetching search results:', error));
    }
  }, [location.state]); 

  console.log("Search results:", professors); // Add this line to print search results

  return (
    <div className="App">
      <NavBar/>
      <ProfessorProfiles professors={professors} />
    </div>
  );
}

export default Search;

