import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
const GoogleLoginButton = () => {
    const navigate = useNavigate();
    
  const handleGoogleLogin = async () => {

    const apiUrl = import.meta.env.VITE_API_URL;

    window.location.href = `${apiUrl}/OauthRoutes/google`

    
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
