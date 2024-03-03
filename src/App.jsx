
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LogInPage from './webpages/signinpage/signin';
import SignUpPage from './webpages/signuppage/signuppage';
import StartPage from './webpages/startpage/startpage'; // Import the Start component
import AccountSettings from './webpages/accountsettings/accountsettings';
import Homepage from './webpages/homepage/homepage';
import Professors from "./webpages/professorPage/professorPage";
import ProfessorPage from './webpages/professorPage/professorPage' // Adjust the import path as necessary
import QuizPage from './webpages/quizPage/QuizPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/loginpage" element={<LogInPage />} />
          <Route path="/signuppage" element={<SignUpPage />} />
          <Route path="/" element={<StartPage />} /> 
          <Route path="/Homepage" element={<Homepage />} /> 
          <Route path="/accountsettings" element={<AccountSettings />} />
          <Route path="/professorPage" element={<ProfessorPage />} /> {/* Example static professor page */}
          <Route path="/quizPage" element={<QuizPage />} />

          <Route path="/professor/:name" element={<ProfessorPage />} /> {/* Dynamic professor page */}
        </Routes>
      </div>
    </Router>
  );
}


export default App;
