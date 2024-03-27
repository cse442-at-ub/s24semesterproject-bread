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

import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <AuthProvider> {/* Wrap everything in AuthProvider to provide authentication context */}
      <Router>
        <div className="App">
          <Routes>
            <Route path="/signinpage" element={<LogInPage />} />
            <Route path="/signuppage" element={<SignUpPage />} />
            <Route path="/" element={<StartPage />} /> 
            {/* Wrap protected routes with ProtectedRoute component */}
            <Route path="/review/:name" element={<ProtectedRoute><Review /></ProtectedRoute>} />
            <Route path="/homepage" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
            <Route path="/accountsettings" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />
            <Route path="/professorPage" element={<ProtectedRoute><ProfessorPage /></ProtectedRoute>} />
            <Route path="/quizPage" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
            <Route path="/professor/:name" element={<ProtectedRoute><ProfessorPage /></ProtectedRoute>} />
            {/* Assuming you want the search feature open to everyone in sprint 2, so it's not wrapped */}
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}


export default App;
