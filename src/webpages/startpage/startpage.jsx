import React, { useState, useEffect } from 'react';
import './startpage.css';
import NavBar from '../navBar/preNavBar';
import Banner from '../../components/Startcomponents/Banner';
import Testimonials from '../../components/Startcomponents/Testimonials';
import MTestimonials from '../../components/Startcomponents/MTestimonials';
import Footer from '../../components/Startcomponents/Footer';

function Start() {
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
      <NavBar />
      <div className="content">
        <Banner />
        {screenWidth <= 640 ? <MTestimonials /> :<Testimonials />}
        <Footer />
      </div>
    </div>
  );
}

export default Start;
