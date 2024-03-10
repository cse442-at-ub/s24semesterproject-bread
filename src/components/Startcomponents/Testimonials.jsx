// Testimonials.js

import React from 'react';
import Comment from './Comment.png';
import Like from './Like.png';
import Teach from './Teach.png';

function Testimonials() {
  return (
    <section className="testimonials">
      <div className="testimonial" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ 
          width: '458px',
          height: '70px',
          fontFamily: 'Newsreader',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '30px',
          lineHeight: '120%',
          textAlign: 'center',
          fontWeight:'400',
          letterSpacing: '-0.02em',
          color: '#000000',
        }}>
          <img src={Comment} alt="Comment" style={{ width: 'calc(12.5vw + 12.5vh)', height: 'calc(12.5vw + 12.5vh)', margin: '0 auto' }} />
          <p>Stay anonymous<br></br> Manage and edit rating</p>
        </div>

        <div style={{ 
          width: '458px',
          height: '70px',
          fontFamily: 'Newsreader',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '30px',
          lineHeight: '120%',
          textAlign: 'center',
          fontWeight:'400',
          letterSpacing: '-0.02em',
          color: '#000000',
        }}>
          <img src={Teach} alt="Teach" style={{ width: 'calc(12.5vw + 12.5vh)', height: 'calc(12.5vw + 12.5vh)', margin: '0 auto' }} />
          <p>Understand their teaching <br></br>styles</p>
        </div>

        <div style={{ 
          width: '458px',
          height: '70px',
          fontFamily: 'Newsreader',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '30px',
          lineHeight: '120%',
          textAlign: 'center',
          fontWeight:'400',
          letterSpacing: '-0.02em',
          color: '#000000',
        }}>
          <img src={Like}alt="Like" style={{ width: 'calc(12.5vw + 12.5vh)', height: 'calc(12.5vw + 12.5vh)', margin: '0 auto' }} />
          <p>Like and dislike ratings</p>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
