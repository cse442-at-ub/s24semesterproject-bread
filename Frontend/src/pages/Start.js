import React from 'react';
import './Start.css';
import Header from './Startcomponents/Header';
import Banner from './Startcomponents/Banner';
import Testimonials from './Startcomponents/Testimonials';
import Footer from './Startcomponents/Footer';

function Start() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <Banner />
        <Testimonials />
        <Footer />
      </div>
    </div>
  );
}

export default Start;
