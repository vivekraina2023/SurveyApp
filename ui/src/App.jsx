import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import OAuth2Callback from './components/OAuth2Callback.jsx';
import SurveyDesigner from './components/SurveyDesigner.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const checkAuthStatus = () => {
    fetch('https://api.priyaraina.com/auth/status', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        setIsAuthenticated(data.isAuthenticated);
      })
      .catch(err => {
        console.error('Auth check failed:', err);
        setIsAuthenticated(false);
      });
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/survey-designer" /> : <Login />
        } />
        <Route path="/oauth2callback" element={<OAuth2Callback />} />
        <Route
          path="/survey-designer"
          element={
            isAuthenticated ? (
              <SurveyDesigner setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App; 