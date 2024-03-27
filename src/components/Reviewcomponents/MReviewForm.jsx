import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MReviewForm.css';
import Professor from './Unknown.jpeg';

const MReviewForm = ({ professorImage }) => {
  const { name } = useParams();
  const [formData, setFormData] = useState({
    course: '',
    term: '',
    difficulty: '',
    helpfulness: '',
    clarity: '',
    feedback: '',
    professorType: '',
    comment: ''
  });
  const [charCount, setCharCount] = useState(0);
  const [profName, setProfName] = useState('');
  const [department, setDepartment] = useState('');

  useEffect(() => {
    const [profNameParam, departmentParam] = name.split('+');
    setProfName(profNameParam);
    setDepartment(departmentParam);
  }, [name]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (name === 'comment') {
      setCharCount(value.length);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.course || !formData.term || !formData.difficulty || !formData.helpfulness || !formData.clarity || !formData.feedback || !formData.professorType || !formData.comment) {
      alert('You must fill out all fields.');
      return;
    }
    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
    setFormData({
      course: '',
      term: '',
      difficulty: '',
      helpfulness: '',
      clarity: '',
      feedback: '',
      professorType: '',
      comment: ''
    });
    setCharCount(0);
  };

  const handleCancel = () => {
    setFormData({
      course: '',
      term: '',
      difficulty: '',
      helpfulness: '',
      clarity: '',
      feedback: '',
      professorType: '',
      comment: ''
    });
    setCharCount(0);
  };

  return (
    <div className="review-form-container">
      <div className="professor-info-">
        <img src={Professor} alt="Professor" className="professor-image" />
        <div className="professor-details">
        <p><strong>Name:</strong> {profName}</p>
            <p><strong>Department:</strong> {department}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group">
          <label htmlFor="course">Course:</label>
          <select id="course" name="course" value={formData.course} onChange={handleInputChange}>
            <option value="">-- Select Course --</option>
            <option value="add">Add Course</option>
          </select>
          {formData.course === 'add' && (
            <input type="text" name="newCourse" placeholder="Enter new course" value={formData.newCourse} onChange={handleInputChange} />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="term">Term:</label>
          <select id="term" name="term" value={formData.term} onChange={handleInputChange}>
            <option value="">-- Select Term --</option>
            <option value="add">Add Term</option>
          </select>
          {formData.term === 'add' && (
            <input type="text" name="newTerm" placeholder="Enter new term" value={formData.newTerm} onChange={handleInputChange} />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="difficulty">Difficulty:</label>
          <select id="difficulty" name="difficulty" value={formData.difficulty} onChange={handleInputChange}>
            <option value="">-- Select Difficulty --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="helpfulness">Helpfulness:</label>
          <select id="helpfulness" name="helpfulness" value={formData.helpfulness} onChange={handleInputChange}>
            <option value="">-- Select Helpfulness --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="clarity">Clarity:</label>
          <select id="clarity" name="clarity" value={formData.clarity} onChange={handleInputChange}>
            <option value="">-- Select Clarity --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="feedback">Feedback:</label>
          <select id="feedback" name="feedback" value={formData.feedback} onChange={handleInputChange}>
            <option value="">-- Select Feedback --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="professorType">Professor Type:</label>
          <select id="professorType" name="professorType" value={formData.professorType} onChange={handleInputChange}>
            <option value="">-- Select Professor Type --</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <textarea id="comment" name="comment" value={formData.comment} onChange={handleInputChange} />
          <div className="char-count">Character count: {charCount}/500</div>
        </div>
        <div className="form-buttons">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default MReviewForm; 