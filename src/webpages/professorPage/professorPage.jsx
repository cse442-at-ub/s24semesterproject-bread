import React, { useState } from 'react'; // Import useState
import './ProfessorCard.css'; // Make sure this CSS file is correctly linked
import NavBar from '../navBar/NavBar';
import professorInfo from './professorInfo'; // Assuming this is imported
import defaultPic from "../../images/defaultPic.png"; // Adjust the path as necessary

const ProfessorCard = () => {
    // Initialize reviews state with professorInfo.reviews
    const [reviews, setReviews] = useState(professorInfo.reviews);

    const sortReviews = (sortBy) => {
      const sortedReviews = [...reviews].sort((a, b) => {
        if (sortBy === "rating") {
          return b.rating - a.rating; // For descending order
        } else if (sortBy === "author") {
          return a.author.localeCompare(b.author); // For alphabetical order
        }
        return 0;
      });
  
      setReviews(sortedReviews);
    };

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

    const handleWriteReview = () => {
        alert("This function will be implemented later");
    };


    return (
        <div className='professor-main'>
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
            <div className='sort-button-container'>
                <button className='sort-button' onClick={() => sortReviews("rating")}>Sort by Rating</button>
                <button className='sort-button' onClick={() => sortReviews("author")}>Sort by Author</button> 
            </div>

            {/* Render the sorted reviews */}
            <div className="reviews">
                {reviews && reviews.map((review, index) => (
                    <Review 
                        key={index} 
                        author={review.author} 
                        content={review.content} 
                        rating={review.rating}
                        term={review.term}
                        course={review.course}
                    />
                ))}
            </div>

            {/* Write a review button */}
            <div className="write-review-container">
                <button className="write-review-button" onClick={handleWriteReview}>Write a Review</button>
            </div>
        </div>
    );
};

export default ProfessorCard;
