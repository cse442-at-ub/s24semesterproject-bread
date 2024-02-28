import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Signin from './webpages/Login/Login';
import Signup from './webpages/Signup/Signup';
import Start from './webpages/Start/Start'; // Import the Start component
import Homepage from './webpages/homepage/Homepage';
import AccountSettings from './webpages/account_Settings/Account_Settings';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/start" element={<Start />} /> 
          <Route path="/Homepage" element={<Homepage />} /> 
          <Route path="/accountSettings" element={<AccountSettings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
