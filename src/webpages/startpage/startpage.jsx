import React from 'react';
import './startpage.css';
import NavBar from '../navBar/preNavBar';
import Banner from '../../components/Startcomponents/Banner';
import Testimonials from '../../components/Startcomponents/Testimonials';
import Footer from '../../components/Startcomponents/Footer';

function Start() {
  return (
    <div className="App">
      <NavBar />
      <div className="content">
        <Banner />
        <Testimonials />
        <Footer />
      </div>
    </div>
  );
}


export default Start;

