import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './QuizPage.css';
import questions from './questions.jsx';
import rick from '../../images/tenor.gif';


const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSelectOption = (questionIndex, option) => {
    setAnswers({ ...answers, [questionIndex]: option });
  };

  const calculateResult = () => {
    if (Object.keys(answers).length !== questions.length) {
      setErrorMessage('Please fill out all the questions');
      return;
    }

    setErrorMessage('');
    alert("Great! We're now in the process of referring you to a professor");
    navigate('/homepage');
  };

  const handleDecline = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className='quiz-main'>
      <div className="quiz-container">
        <div className="quiz-header">Let's find your type of professor!</div>
        <p>Embarking on your educational path is not just about choosing the right courses; it's also about connecting with the right mentors...</p>

        {questions.map((q, index) => (
          <div key={index} className="question-block">
            <div className="question">{q.question}</div>
            <div className="options">
              {q.options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  className={`option-button ${answers[index] === option.charAt(0) ? 'selected' : ''}`}
                  onClick={() => handleSelectOption(index, option.charAt(0))}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}

        <button className="submit-btn" onClick={calculateResult}>Submit</button>
        <button className="submit-btn" onClick={handleDecline}>Decline</button>

        {errorMessage && <div style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{errorMessage}</div>}

        {showPopup && (
          <div className="popup">
            <img src={rick} alt="Rick Roll" />
            <p>Once again, this quiz helps us find a suitable professor for you!</p>
            <button onClick={handleClosePopup}>Go Back</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;

