import React, { useState, useEffect } from 'react';
import './Review.css';
import ReviewForm from '../../components/Reviewcomponents/ReviewForm';
import AlternateMain from '../../components/Reviewcomponents/MReviewForm';
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
      {screenWidth <= 540 ? <AlternateMain /> :<ReviewForm />}
      </div>
  );
}

export default App;