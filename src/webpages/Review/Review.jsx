import React, { useState, useEffect } from 'react';
import './Review.css';
import Main from '../../components/Reviewcomponents/PCReview';
import AlternateMain from '../../components/Reviewcomponents/MReview';
import NavBar from '../navBar/NavBar';

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
      <NavBar/>
      {screenWidth <= 540 ? <AlternateMain /> : <Main />}
    </div>
  );
}

export default App;
