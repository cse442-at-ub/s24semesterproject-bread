// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogInPage from './webpages/loginpage/loginpage';
import SignUpPage from './webpages/signuppage/signuppage';
import AccountSettings from './webpages/accountsettings/accountsettings';
import Homepage from './webpages/homepage/homepage';
import QuizPage from './webpages/quizPage/quizpage';
import StartPage from './webpages/startpage/startpage'; // Import the Start component


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/" element={<StartPage />} />
        <Route path='/homepage' element={<Homepage/>}/>
        <Route path="/accountSettings" element={<AccountSettings />} />
        <Route path="/quizPage" element={<QuizPage />} />
      </Routes>
    </Router>
  );
};

export default App;
