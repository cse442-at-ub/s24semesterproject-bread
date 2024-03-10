import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import LogInPage from './webpages/signinpage/signin';
import SignUpPage from './webpages/signuppage/signuppage';
import StartPage from './webpages/startpage/startpage';
import AccountSettings from './webpages/accountsettings/accountsettings';
import Homepage from './webpages/homepage/homepage';
import Professors from "./webpages/professorPage/professorPage";
import ProfessorPage from './webpages/professorPage/professorPage';
import QuizPage from './webpages/quizPage/QuizPage';
import Review from './webpages/Review/Review';
import Search from './webpages/searchresult/searchresult';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signinpage" element={<LogInPage />} />
          <Route path="/signuppage" element={<SignUpPage />} />
          <Route path="/" element={<StartPage />} /> 
          <Route path="/review" element={<Review />} /> 
          <Route path="/homepage" element={<Homepage />} /> 
          <Route path="/accountsettings" element={<AccountSettings />} />
          <Route path="/professorPage" element={<ProfessorPage />} />
          <Route path="/quizPage" element={<QuizPage />} />
          <Route path="/professor/:name" element={<ProfessorPage />} />
          <Route path="/search" element={<Search />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
