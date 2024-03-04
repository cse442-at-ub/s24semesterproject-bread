import './MReview.css';
import Professor from './Unknown.jpeg';
import React from 'react';

function AlternateMain() {
    return (
        <div className="m-re-main-container">
            <div className="m-re-avatar-section" style={{ top: '20px' }}>
                <img src={Professor} style={{ width: 'calc(10vw + 10vh)', height: 'calc(10vw + 10vh)'}} alt="Professor" className="m-re-avatar" />
            </div>
            <div className="m-re-form-section">
                <div className="m-re-form-row">
                    <label htmlFor="name" className="m-re-styled-label" style={{ fontSize: 'calc(3vw + 1vh)' }}>Name:</label>
                    <input type="text" id="name" name="name" required placeholder="Enter Professor's name" className="m-re-input-field" style={{ fontSize: 'calc(2vw + 0.5vh)' }} />
                </div>
                <div className="m-re-form-row">
                    <label htmlFor="department" className="m-re-styled-label" style={{ fontSize: 'calc(3vw + 1vh)' }}>Department:</label>
                    <input type="text" id="department" name="department" required placeholder="Enter Professor's department" className="m-re-input-field" style={{ fontSize: 'calc(2vw + 0.5vh)' }} />
                </div>
                <div className="m-re-form-row">
                    <label htmlFor="term" className="m-re-styled-label" style={{ fontSize: 'calc(3vw + 1vh)' }}>Term:</label>
                    <input type="text" id="term" name="term" required placeholder="Enter the term of your course." className="m-re-input-field" style={{ fontSize: 'calc(2vw + 0.5vh)' }} />
                </div>
                <div className="m-re-form-row">
                    <label htmlFor="term" className="m-re-styled-label" style={{ fontSize: 'calc(3vw + 1vh)' }}>Course</label>
                    <input type="text" id="course" name="course" required placeholder="Enter the course that you took " className="m-re-input-field" style={{ fontSize: 'calc(2vw + 0.5vh)' }} />
                </div>
                <div className="m-re-form-row">
                    <label htmlFor="rating" className="m-re-styled-label" style={{ fontSize: 'calc(3vw + 1vh)' }}>Rating:</label>
                    <input type="number" id="rating" name="rating" min="1" max="5" required placeholder="Submit a rating out of 5" className="m-re-input-field" style={{ fontSize: 'calc(2vw + 0.5vh)' }} />
                </div>
            </div>
        </div>
    );
}

export default AlternateMain;
