import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotAuthorized = () => {
  const navigate = useNavigate();

  // Redirect to home page after 5 seconds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate('/home');
    }, 3000); // Adjust the delay time as needed (in milliseconds)

    // Clean up the timeout
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div>
      <h1>Not Authorized</h1>
      <p>You do not have permission to view this page.</p>
    </div>
  );
};

export default NotAuthorized;