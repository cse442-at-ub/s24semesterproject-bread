import './PC.css';
import Professor from './Unknown.jpeg';
import React from 'react';

function Main() {
  return (
    <div className="main-container">
      <div className="form-section">
        <div className="form-container" style={{ marginTop: '7.5%', width: '90%', marginLeft: '-20%' }}>
          <div className="form-row">
            <label htmlFor="name" className="styled-label" style={{fontSize: 'calc(2vw + 1vh)' }}>Name:</label>
            <div className="input-container">
              <input type="text" id="name" name="name" required placeholder="Enter Professor's name" style={{ fontSize: 'calc(2vw + 0.5vh)' }} />
            </div>
          </div>
        </div>
        <div className="form-container" style={{ width: '90%', marginLeft: '-20%' }}>
          <div className="form-row">
            <label htmlFor="department" className="styled-label" style={{ fontSize: 'calc(2vw + 1vh)' }}>Department:</label>
            <div className="input-container">
              <input type="text" id="department" name="department" required placeholder="Enter Professor's department" style={{ fontSize: 'calc(2vw + 0.5vh)' }} />
            </div>
          </div>
        </div>
        <div className="form-container" style={{ width: '90%', marginLeft: '-20%' }}>
          <div className="form-row">
            <label htmlFor="term" className="styled-label" style={{ fontSize: 'calc(2vw + 1vh)' }}>Term:</label>
            <div className="input-container">
              <input type="text" id="term" name="term" required placeholder="Enter the term of your course." style={{ fontSize: 'calc(2vw + 0.5vh)' }} />
            </div>
          </div>
        </div>
        <div className="form-container" style={{ width: '90%', marginLeft: '-20%' }}>
          <div className="form-row" style={{ width: '80%' }}>
            <label htmlFor="course" className="styled-label" style={{ fontSize: 'calc(2vw + 1vh)' }}>Course:</label>
            <div className="input-container">
              <input type="text" id="course" name="course" required placeholder="Enter your course." style={{ fontSize: 'calc(2vw + 0.5vh)' }} />
            </div>
          </div>
        </div>
      </div>
      <div className="avatar-rating-section">
        <div className="avatar" style={{ position: 'relative', width: '70%' }}>
          <img src={Professor} alt="Avatar" style={{ width: 'calc(12.5vw + 12.5vh)', height: 'calc(12.5vw + 12.5vh)', position: 'relative', right: '-37.5vw', top: '7.5vw' }} />
        </div>
        <div className="form-container" style={{ width: '100%', position: 'relative', right: '-32.5vw', top: '7.5vw' }}>
          <div className="form-row">
            <label htmlFor="rating" className="styled-label" style={{ fontSize: 'calc(1.5vw + 0.5vh)' }}>Rating:</label>
            <div className="input-container" style={{ position: 'relative' ,marginTop:'0.125vw',right:'0.8vw'}} >
              <input type="number" id="rating" name="rating" min="1" max="5" required placeholder=" Submit a rating out of 5" style={{ fontSize: 'calc(1.5vw + 0.5vh)' }} />
            </div>
          </div>
        </div>
        </div>
        <div className="review-section" style={{marginTop: '0vw', width: 'calc(90vw + 10vh)'}}>
          <textarea rows="5" placeholder="Write a review..." style={{ fontSize: 'calc(2vw + 0.5vh)' }}></textarea>
          <button type="submit" style={{ fontSize: 'calc(1.25vw + 0.5vh)' }}>Submit Rating</button>
          </div>
    </div>
  );
}

export default Main;