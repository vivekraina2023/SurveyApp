import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OAuth2Callback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get the authorization code from URL parameters
    const params = new URLSearchParams(location.search);
    const code = params.get('code');

    if (code) {
      // Send the code to your backend
      fetch('/api/auth/google/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
      .then(response => response.json())
      .then(data => {
        // Store the token
        localStorage.setItem('token', data.token);
        // Redirect to home page
        navigate('/');
      })
      .catch(error => {
        console.error('Authentication error:', error);
        navigate('/login');
      });
    }
  }, [location, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Authenticating...</p>
    </div>
  );
};

export default OAuth2Callback; 