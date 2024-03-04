import React, { useState } from 'react';
import NavBar from '../navBar/NavBar';
import './QuizPage.css'; // Make sure this CSS file includes styles for your table
import questions from './questions.jsx';

const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState('');
  const [showTable, setShowTable] = useState(false); // State to control table visibility

  // Questions array remains the same...

  const handleSelectOption = (questionIndex, option) => {
    setAnswers({ ...answers, [questionIndex]: option });
  };

  const calculateResult = () => {
    const counts = { A: 0, B: 0, C: 0, D: 0, E: 0 };
    Object.values(answers).forEach(answer => counts[answer]++);
    const maxCount = Math.max(...Object.values(counts));
    const topCategories = Object.keys(counts).filter(key => counts[key] === maxCount);
    setResult(`Your best match: ${topCategories.join(' and ')}`);
    setShowTable(true); // Show the table when results are calculated
  };

// Simple Table Component with Custom CSS Class
const Table = () => (
  <table className="customTable">
    <thead>
      <tr>
        <th>Letter</th>
        <th>Professor Type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>A</td>
        <td>The Mentor</td>
        <td>Professors who are especially supportive, providing personalized guidance and encouragement.</td>

      </tr>
      <tr>
        <td>B</td>
        <td>The Innovator</td>
        <td>Instructors who use cutting-edge technology and innovative teaching methods to engage students.</td>

      </tr>

      <tr>
        <td>C</td>
        <td>The Traditionalist</td>
        <td>Educators who prefer structured, lecture-based teaching and traditional assessment methods.</td>
      </tr>

      <tr>
        <td>D</td>
        <td>The Facilitator</td>
        <td>Teachers who promote an interactive learning environment, encouraging group work and discussions.</td>
      </tr>

      <tr>
        <td>E</td>
        <td>The Challenger</td>
        <td>Professors known for their rigorous academic standards, challenging students to think critically and independently.
</td>
      </tr>
    </tbody>
  </table>
);


  return (
    <div className='main'>
      <div className="quiz-container">
        <NavBar />
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
        {result && <div className="result">{result}</div>}
        {showTable && (
          <>
            <h2>If your best match was an...</h2> {/* Title for the table */}
            <Table />
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
