// AlternateMain.js

import './MReview.css';
import Professor from './Unknown.jpeg';
import React from 'react';

function AlternateMain() {
    return (
        <div className="main-container">
            <div className="avatar-section">
                <img src={Professor} style={{ width: 'calc(10vw + 10vh)', height: 'calc(10vw + 10vh)'}}alt="Professor" className="avatar" />
            </div>
            <div className="form-section">
                <div className="form-row">
                    <label htmlFor="name" className="styled-label"style={{ fontSize: 'calc(3vw + 1vh)' }}>Name:</label>
                    <input type="text" id="name" name="name" required placeholder="Enter Professor's name" className="input-field" style={{ fontSize: 'calc(2vw + 0.5vh)' }} />
                </div>
                <div className="form-row">
                    <label htmlFor="department" className="styled-label"style={{ fontSize: 'calc(3vw + 1vh)' }}>Department:</label>
                    <input type="text" id="department" name="department" required placeholder="Enter Professor's department" className="input-field" style={{ fontSize: 'calc(2vw + 0.5vh)' }} />
                </div>
                <div className="form-row">
                    <label htmlFor="term" className="styled-label"style={{ fontSize: 'calc(3vw + 1vh)' }}>Term:</label>
                    <input type="text" id="term" name="term" required placeholder="Enter the term of your course." className="input-field" style={{ fontSize: 'calc(2vw + 0.5vh)' }} />
                </div>
                <div className="form-row">
                    <label htmlFor="term" className="styled-label" style={{ fontSize: 'calc(3vw + 1vh)' }}>Course</label>
                    <input type="text" id="course" name="course" required placeholder="Enter the course that you took " className="input-field" style={{ fontSize: 'calc(2vw + 0.5vh)' }} />
                </div>
                <div className="form-row">
                    <label htmlFor="rating" className="styled-label"style={{ fontSize: 'calc(3vw + 1vh)' }}>Rating:</label>
                    <input input type="number" id="rating" name="rating" min="1" max="5" required placeholder="Submit a rating out of 5" className="input-field" style={{ fontSize: 'calc(2vw + 0.5vh)' }} />
                </div>
            </div>
            <div className="review-section" style={{display: 'flex',justifyContent: 'center',alignItems: 'center',marginTop: '0vw', width: 'calc(80vw + 10vh)'}}>
          <textarea rows="5" placeholder="Write a review..." style={{ fontSize: 'calc(2vw + 1vh)' }}></textarea>
          <button type="submit" style={{ fontSize: 'calc(2.5vw + 1vh)' }}>Submit Rating</button>
            </div>
        </div>
    );
}

export default AlternateMain;
