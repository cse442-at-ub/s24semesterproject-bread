import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './QuizPage.css';
import questions from './questions.jsx';

const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSelectOption = (questionIndex, option) => {
    setAnswers({ ...answers, [questionIndex]: option });
  };

  const calculateResult = () => {
    if (Object.keys(answers).length !== questions.length) {
      setErrorMessage('Please fill out all the questions');
      return;
    }

    setErrorMessage(''); // Clear error message on successful submission
    alert("Great! We're now in the process of referring you to a professor");
    navigate('/homepage');
  };

  return (
    <div className='quiz-main'>
      <div className="quiz-container">
        <div className="quiz-header">Let's find your type of professor!</div>
        <p>Embarking on your educational path is not just about choosing the right courses; it's also about connecting with the right mentors. Understanding your preferences and personality can significantly impact your learning experience and academic success. This quiz is designed to help you navigate the diverse teaching styles and personalities you'll encounter in your academic journey.</p>
        
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
        {errorMessage && <div style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{errorMessage}</div>}
        <button className="submit-btn" onClick={calculateResult}>Submit</button>

        <button className="submit-btn" >Decline</button>

      </div>
    </div>
  );
};

export default Quiz;
