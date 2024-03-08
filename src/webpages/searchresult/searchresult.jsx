import React from 'react';
import ProfessorProfiles from '../../components/Searchcomponents/ProfessorSearchPage';
import NavBar from '../navBar/NavBar';

function Search() {
  return (
    <div className="App">
        <NavBar/>
      <ProfessorProfiles />
    </div>
  );
}

export default Search;
