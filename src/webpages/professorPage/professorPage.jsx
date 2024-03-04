import React from 'react';
import './ProfessorCard.css'; // Make sure this CSS file is correctly linked
import NavBar from '../navBar/NavBar';
import Review from './review'; // Import the Review component
import professorInfo from './professorInfo'; // Assuming this is imported
import defaultPic from "../../images/defaultPic.png"; // Adjust the path as necessary

const ProfessorCard = () => {
    return (
        <div>
            <NavBar/>
            <div className="professor-card">
                <img src={professorInfo.profilePicture || defaultPic} alt="Professor" className="professor-img" />
                <div className="professor-info">
                    <h2>{professorInfo.name}</h2>
                    <p>{professorInfo.department}</p>
                </div>
                <div className="professor-rating">
                    <span>{professorInfo.rating}/5</span>
                </div>
            </div>
            {/* Review components are rendered here, below professor information */}
            <div className="reviews">
                {professorInfo.reviews && professorInfo.reviews.map((review, index) => (
                    <Review 
                        key={index} 
                        author={review.author} 
                        content={review.content} 
                        rating={review.rating}
                        term={review.term}  // Make sure your review data includes these
                        course={review.course} // Same here
                    />
                ))}
            </div>
        </div>
    );
};

export default ProfessorCard;
