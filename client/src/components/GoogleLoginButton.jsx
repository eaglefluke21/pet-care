import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
const GoogleLoginButton = () => {
    const navigate = useNavigate();
    
  const handleGoogleLogin = async () => {

    try {
        

        const backendurl = 'http://localhost:3000';
            const url = `${backendurl}/OauthRoutes/google`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        // Ensure credentials are sent with the request
        credentials: 'include'
      });

      if (response.ok) {
        navigate('/home');
        
      } else {
        // Handle error response
        const errorMessage = await response.text();
        console.error('Google login error:', errorMessage);
        // Optionally show an error message to the user
      }
    } catch (error) {
      console.error('Error during Google login:', error);
      // Handle network or other errors
    }
  };

  return (

    <div className="flex flex-col min-h-screen ">
        <Header/>
        <button className="w-72 bg-black rounded-md py-1.5 font-quick font-semibold shadow-sm shadow-black text-white " onClick={handleGoogleLogin}>
      Login with Google
    </button>
    <Footer/>
    </div>
  );
};

export default GoogleLoginButton;
