import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProfessorCard.css';
import NavBar from '../navBar/NavBar';
import defaultPic from "../../images/defaultPic.png";

const ProfessorCard = () => {
    const { name } = useParams();
    const [professorInfo, setProfessorInfo] = useState({
        name: '',
        department: '',
        profilePicture: '',
        rating: 0,
        reviews: []
    });

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // Simulated fetch request based on professor name
        fetchProfessorInfo(name);
    }, [name]);

    useEffect(() => {
        console.log("Professor Name:", professorInfo.name);
        console.log("Professor Department:", professorInfo.department);
        setReviews(professorInfo.reviews); // Update reviews state with professorInfo.reviews
    }, [professorInfo]);

    const fetchProfessorInfo = (professorName) => {
        // Simulated fetch request
        setTimeout(() => {
            // Replace with actual fetch request to retrieve professor info based on name
            setProfessorInfo({
                name: professorName,
                department: 'Computer Science', // Example department
                profilePicture: '', // Example profile picture
                rating: 4.5, // Example rating
                reviews: [ // Example reviews
                    { author: "John Doe", content: "Great professor!", rating: 5, term: "Fall 2023", course: "CS101" },
                    { author: "Jane Smith", content: "Very knowledgeable", rating: 4, term: "Spring 2022", course: "CS202" }
                ]
            });
        }, 1000); // Simulate loading delay
    };

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