import React, { useState, useEffect } from 'react';
import './App.css';
import Main from './components/Review';
import AlternateMain from './components/AlternateReview';

function App() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="App">
      {screenWidth <= 540 ? <AlternateMain /> : <Main />}
    </div>
  );
}

export default App;
