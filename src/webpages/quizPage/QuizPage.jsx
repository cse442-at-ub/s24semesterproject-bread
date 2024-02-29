import React, { useState } from 'react';
import NavBar from '../navBar/NavBar';
import './QuizPage.css'; // Assuming your CSS file is named Quiz.css

const Quiz = () => {
  // States for tracking quiz answers and results
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState('');

  // Questions array
  const questions = [
    {
        question: "When starting a new topic, you prefer a professor who:",
        options: [
          "A. Breaks down complex concepts into understandable parts.",
          "B. Introduces interactive tools and technologies.",
          "C. Begins with a comprehensive lecture on the topic.",
          "D. Encourages group activities to explore the topic.",
          "E. Presents a challenging problem to solve using the topic."
        ]
      },
      {
        question: "Your ideal study material format is:",
        options: [
          "A. Personalized notes or study guides.",
          "B. Digital resources and online courses.",
          "C. Textbooks and academic papers.",
          "D. Collaborative study groups and forums.",
          "E. Real-world case studies and examples."
        ]
      },
      {
        question: "During lectures, you prefer:",
        options: [
          "A. Frequent check-ins to ensure understanding.",
          "B. The use of multimedia presentations and visuals.",
          "C. Detailed note-taking and traditional lectures.",
          "D. Interactive discussions and peer feedback.",
          "E. Debates and critical analysis tasks."
        ]
      },
      {
        question: "The type of assignments you find most enriching are:",
        options: [
          "A. Projects with step-by-step feedback.",
          "B. Creative assignments using new software or methods.",
          "C. Standard essays and problem sets.",
          "D. Group projects with peer evaluations.",
          "E. Independent research projects with minimal guidance."
        ]
      },
      {
        question: "Feedback on your work should be:",
        options: [
          "A. Supportive, with constructive suggestions.",
          "B. Innovative, offering creative improvements.",
          "C. Direct, with clear indications of right or wrong.",
          "D. Collaborative, including feedback from peers.",
          "E. Challenging, pushing you to do better."
        ]
      }
  
    // Add all other questions following the same structure
  ];

   // Function to handle option selection
   const handleSelectOption = (questionIndex, option) => {
    setAnswers({ ...answers, [questionIndex]: option });
  };

  // Function to calculate and set the result
  const calculateResult = () => {
    const counts = { A: 0, B: 0, C: 0, D: 0, E: 0 };
    Object.values(answers).forEach(answer => counts[answer]++);
    const maxCount = Math.max(...Object.values(counts));
    const topCategories = Object.keys(counts).filter(key => counts[key] === maxCount);
    setResult(`Your best match: ${topCategories.join(' and ')}`);
  };

  return (
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
    </div>
  );
};

export default Quiz;