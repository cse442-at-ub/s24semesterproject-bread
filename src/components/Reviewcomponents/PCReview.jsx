import './PC.css';
import Professor from './Unknown.jpeg';
import React from 'react';

function Main() {
  return (

    <div className="pc-re-main-container">
      <div className="pc-re-form-section" >
        <div className="pc-re-form-container" style={{ marginTop: '10.5%', width: '90%', marginLeft: '-20%' }}>
          <div className="pc-re-form-row"style={{ width: '100%' }}>
            <label htmlFor="name" className="pc-re-styled-label" style={{fontSize: 'calc(2vw + 1vh)' }}>Name:</label>
            <div className="pc-re-input-container">
              <input type="text" id="name" name="name" required placeholder="Enter Professor's name" style={{ fontSize: 'calc(2vw + 0.5vh)' }} />
            </div>
          </div>
        </div>
        <div className="pc-re-form-container" style={{ width: '90%', marginLeft: '-20%' }}>
          <div className="pc-re-form-row"style={{ width: '100%' }}>
            <label htmlFor="department" className="pc-re-styled-label" style={{ fontSize: 'calc(2vw + 1vh)' }}>Department:</label>
            <div className="pc-re-input-container">
              <input type="text" id="department" name="department" required placeholder="Enter Professor's department" style={{ fontSize: 'calc(2vw + 0.5vh)' }} />
            </div>
          </div>
        </div>
        <div className="pc-re-form-container" style={{ width: '90%', marginLeft: '-20%' }}>
          <div className="pc-re-form-row"style={{ width: '100%' }}>
            <label htmlFor="term" className="pc-re-styled-label" style={{ fontSize: 'calc(2vw + 1vh)' }}>Term:</label>
            <div className="pc-re-input-container">
              <input type="text" id="term" name="term" required placeholder="Enter the term of your course." style={{ fontSize: 'calc(2vw + 0.5vh)' }} />
            </div>
          </div>
        </div>
        <div className="pc-re-form-container" style={{ width: '90%', marginLeft: '-20%' }}>
          <div className="pc-re-form-row" style={{ width: '100%' }}>
            <label htmlFor="course" className="pc-re-styled-label" style={{ fontSize: 'calc(2vw + 1vh)' }}>Course:</label>
            <div className="pc-re-input-container">
              <input type="text" id="course" name="course" required placeholder="Enter your course." style={{ fontSize: 'calc(2vw + 0.5vh)' }} />
            </div>
          </div>
        </div>
      </div>
      <div className="pc-re-avatar-rating-section"style={{ top: '10%' }}>
        <div className="pc-re-avatar" style={{ position: 'relative', width: '70%' }}>
          <img src={Professor} alt="Avatar" style={{ width: 'calc(10.5vw + 12.5vh)', height: 'calc(10.5vw + 12.5vh)', position: 'relative', right: '-175%', top: '7.5vw' }} />
        </div>
        <div className="pc-re-form-container" style={{ width: '100%', position: 'relative', right: '-120%', top: '7.5vw' }}>
          <div className="pc-re-form-row"style={{ width: '100%' }}>
            <label htmlFor="rating" className="pc-re-styled-label" style={{ fontSize: 'calc(1.5vw + 0.5vh)' }}>Rating:</label>
            <div className="pc-re-input-container" style={{ position: 'relative' ,marginTop:'0.125vw',right:'0.8vw'}} >
              <input type="number" id="rating" name="rating" min="1" max="5" required placeholder=" Submit a rating out of 5" style={{ fontSize: 'calc(1.5vw + 0.5vh)' }} />
            </div>
          </div>
        </div>
        </div>
    </div>
  );
}

export default Main;
