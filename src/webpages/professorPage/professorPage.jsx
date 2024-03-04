// ProfessorCard.jsx
import React from 'react';
import './ProfessorCard.css'; // Make sure this CSS file is correctly linked
import NavBar from '../navBar/NavBar';
import professorInfo from './professorInfo';
import defaultPic from "../../images/defaultPic.png";

const ProfessorCard = () => {



    return (
        <div>
            <NavBar/>
            <div className="professor-card">
                <img src={defaultPic} alt="defaultPic" className="professor-img" />
                <div className="professor-info">
                    <h2>{professorInfo.name}</h2>
                    <p>{professorInfo.department}</p>
                </div>
                <div className="professor-rating">
                    <span>{professorInfo.rating}/5</span>
                </div>
                <div className="professor-reviews">
                </div>
            </div>
        </div>
    );
};

export default ProfessorCard;
