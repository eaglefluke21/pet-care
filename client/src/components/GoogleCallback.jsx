import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const GoogleCallback = () => {
    const navigate = useNavigate();
    const [tokenProcessed, setTokenProcessed] = useState(false);

  
    useEffect(() => {
      if (!tokenProcessed) {
        const urlParams = new URLSearchParams(window.location.search);
        console.log('Fetching urlParams', urlParams);
        const token = urlParams.get('token');
        console.log('Checking token from frontend', token);
  
        if (token) {
          sessionStorage.setItem('jwt', token); // Store JWT in sessionStorage
          setTokenProcessed(true);
          navigate('/home'); // Redirect to home page
        } else {
          console.error('No token found in URL');
          navigate('/'); // Redirect to home or error page
        }
      }
    }, [tokenProcessed, navigate]);
  
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  };
  
  export default GoogleCallback;
