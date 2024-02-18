// src/webpages/home/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className="home-page">
      <h1>InSight</h1>
      <h2>Know your professor with InSight!</h2>
      <div className="features">
        <div className="feature">
          <div className="icon">🗨️</div>
          <p>Stay anonymous. Manage and edit rating.</p>
        </div>
        <div className="feature">
          <div className="icon">👨‍🏫</div>
          <p>Understand their teaching styles.</p>
        </div>
        <div className="feature">
          <div className="icon">👍👎</div>
          <p>Like and dislike ratings.</p>
        </div>
      </div>
      <button onClick={handleSignUpClick}>Sign up now!</button>
      <p>New to InSight? <a href="/signup">Sign up</a></p>
      <p><a href="/login">Log In</a></p>
    </div>
  );
};

export default Home;
