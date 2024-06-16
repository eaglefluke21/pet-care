import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleTokenRetrieval = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = await urlParams.get('token'); 

        if (token) {
          console.log('Fetched token:', token);
          sessionStorage.setItem('jwToken', token);
          setTimeout(() => navigate('/home'), 2000);
        } else {
          console.error('No token found in URL');
         
        }
      } catch (error) {
        console.error('Error fetching token:', error);
       
      }
    };

    handleTokenRetrieval(); 
  }, []);



  return (
    <div>
      <p>Loading...</p>
    </div>
  );
};

export default GoogleCallback;
