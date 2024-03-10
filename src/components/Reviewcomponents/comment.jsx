import React from 'react';

function ReviewSection() {
  return (
    <div>
      
      <div className="pc-re-review-section" style={{ marginTop: '2.5%' }}>
        <textarea className="pc-re-review-textarea" rows="5" placeholder="Write a review..." style={{ fontSize: 'calc(2vw + 0.5vh)' }}></textarea>
        <button className="pc-re-submit-button" type="submit" style={{ fontSize: 'calc(1.25vw + 0.5vh)' }}>Submit Rating</button>
      </div>
    </div>
  );
}

export default ReviewSection;
