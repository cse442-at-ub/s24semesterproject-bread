import React from 'react';
import './ProfessorCard.css'; // Make sure to create and style this CSS file accordingly

const Review = ({ author, content, rating, term, course }) => {
    return (
        <div className="review">
            <div className="review-header">
                <h4>{author}</h4>
                <span>{term} - {course}</span>
                <span>Rating: {rating}</span>
            </div>
            <p>{content}</p>
        </div>
    );
};

export default Review;
