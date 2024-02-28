// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './webpages/signup/SignUp';
import Login from './webpages/login/Login';
import Homepage from './webpages/homepage/Homepage';
import AccountSettings from './webpages/account_Settings/Account_Settings';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path='/' element={<Homepage/>}/>
        <Route path="/accountSettings" element={<AccountSettings />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
