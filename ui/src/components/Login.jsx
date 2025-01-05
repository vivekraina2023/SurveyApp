import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    
    // Auth check
    fetch(`${process.env.REACT_APP_API_URL}/auth/status`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.isAuthenticated) {
          navigate('/survey-designer');
        }
      })
      .catch(err => console.error('Auth check failed:', err));
  }, [navigate]);

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login; 