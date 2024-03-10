import React, { useState, useEffect } from 'react';
import './Review.css';
import Main from '../../components/Reviewcomponents/PCReview';
import AlternateMain from '../../components/Reviewcomponents/MReview';
import ReviewSection from '../../components/Reviewcomponents/comment';

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
    <div className="ReviewApp">
      {screenWidth <= 540 ? <AlternateMain /> : <Main />}
      <ReviewSection/>
      </div>
  );
}

export default App;