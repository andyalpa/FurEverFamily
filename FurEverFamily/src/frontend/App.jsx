import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInPage from './pages/Signin/SignInPage';
import SignUpPage from './pages/Signup/SignUpPage';
import './styles/animations.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signinpage" element={<SignInPage />} />
        <Route path="/signuppage" element={<SignUpPage />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App; 