// ProfessorCard.jsx
import React from 'react';
import './ProfessorCard.css'; // Make sure to create this CSS file
import NavBar from '../navBar/NavBar';
const ProfessorCard = () => {
    // Dummy data for the professor
    const professorInfo = {
        name: "John Doe",
        department: "Department of Engineering and Applied Sciences",
        rating: "4.8",
        numberOfReviews: "120",
        coursesTaught: ["CSE115", "CSE116", "CSE331"]
    };

    return (
        <div>
            <NavBar/>
            <div className="professor-card">
                
                <div className="professor-info">
                    <h2>{professorInfo.name}</h2>
                    <p>{professorInfo.department}</p>
                    <div className="professor-stats">
                        <span>Rating: {professorInfo.rating}</span>
                        <span>Reviews: {professorInfo.numberOfReviews}</span>
                        <span>Courses: {professorInfo.coursesTaught.join(', ')}</span>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default ProfessorCard;
