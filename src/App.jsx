// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './webpages/signup/SignUp';
import Login from './webpages/login/Login';
import Home from './webpages/home/Home';
import Homepage from './webpages/homepage/Homepage';
import AccountSettings from './webpages/account_Settings/Account_Settings';
import QuizPage from './webpages/quizPage/QuizPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path='/homepage' element={<Homepage/>}/>
        <Route path="/accountSettings" element={<AccountSettings />} />
        <Route path="/quizPage" element={<QuizPage />} />
      </Routes>
    </Router>
  );
};

export default App;
