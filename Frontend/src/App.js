import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Signin from './pages/Login';
import Signup from './pages/Signup';
import Start from './pages/Start'; // Import the Start component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/start" element={<Start />} /> {/* Add a new Route for the Start page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
