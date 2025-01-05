import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import OAuth2Callback from './components/OAuth2Callback.jsx';
import SurveyDesigner from './components/SurveyDesigner.jsx';
import ChatBot from './components/ChatBot';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/status`, {
        credentials: 'include'
      });
      const data = await response.json();
      setIsAuthenticated(data.isAuthenticated);
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
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
        
        <ChatBot />
      </div>
    </Router>
  );
}

export default App; 