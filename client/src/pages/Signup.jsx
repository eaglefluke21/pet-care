import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SignupImage from "../assets/Dalmatian.jpg";
import Google from "../assets/google.svg";
import { NavLink } from "react-router-dom";
import CryptoJS from 'crypto-js';
import cryptoEncrypt from "../utils/cyptoEncrypt.jsx";
import Popup from "../components/Popup.jsx";


function Signup() {

    

    const apiUrl = import.meta.env.VITE_API_URL;
    
    const[isPopupVisible , setPopupVisible] = useState(false);


    const [Formdata, setFormdata] = useState({
        username:'',
        email:'',
        password:'',
        role:'user',
    })
    const handleChange = (e) => {

        setFormdata({
            ...Formdata , [e.target.id] : e.target.value
        });

    };

    const handleSubmit = async(e) => {

        e.preventDefault();

     


        try{
            const cryptoKey = await cryptoEncrypt();

            const url = `${apiUrl}/users/register`;

            const encryptedPassword = CryptoJS.AES.encrypt(Formdata.password,cryptoKey).toString();

            const responsestore = await fetch(url,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify({...Formdata,password: encryptedPassword}),
            });

            const responsejson = await responsestore.json();
            console.log(responsejson);

            if(responsestore.status === 201) {
                setPopupVisible(true);                
            } else {
               
                console.error('User creation failed:', error);
            }

        } catch(error){
            alert('user creation failed');
            console.log("Error occured while creating User:", error);
        }

    };
    
    const closePopup = () => {
        setPopupVisible(false);
    };


      
  const handleGoogleLogin = async () => {

    window.location.href = `${apiUrl}/OauthRoutes/google/signup`

    
  };

    return(
        <div className="flex flex-col min-h-screen ">

        <Header/>

        <div className="flex flex-col flex-grow lg:flex-row lg:justify-evenly bg-gradient-to-r from-orange-100 to-orange-200 py-16 rounded-md">



            <form className="flex flex-col justify-center px-6 sm:px-40 lg:px-20 lg:w-[40rem] " onSubmit={handleSubmit}>

            <p className="font-quick text-3xl font-bold mb-10"> Create a new account</p>

            <div className="mb-10">
            <label className="font-quick text-lg font-bold ">  Name </label>
            <input id="username" value={Formdata.username} className="w-full border-gray-700  border rounded-md py-1 font-quick ps-4 font-semibold " onChange={handleChange} required></input>
            </div>

            <div className="mb-10">
            <label className="font-quick text-lg font-bold "> Email Address </label>
            <input id="email" type="email" value={Formdata.email} className="w-full border-gray-700  border rounded-md py-1 font-quick ps-4 font-semibold " onChange={handleChange} required></input>
            </div>

            <div className="mb-10">
            <label className="font-quick text-lg font-bold "> Password </label>
            <input id="password" type="password" value={Formdata.password} className="w-full border-gray-700  border rounded-md py-1 font-quick ps-4 font-semibold" onChange={handleChange} required></input>
            </div>

            <NavLink to='/AdminSignup'> <span className="font-quick font-bold  hover:underline cursor-pointer ml-auto mb-2"> Create Admin Account ?</span> </NavLink>
           
            <button type="submit" className="w-full bg-black rounded-md py-1.5 font-quick font-semibold shadow-sm shadow-black text-white "> Sign Up</button>

            
            <div className="flex items-center justify-center w-full my-4">
        <hr className="border-t-2 border-black w-1/4 mr-4"/>
        <p className="text-black  font-anta text-md">continue with</p>
        <hr className="border-t-2 border-black w-1/4 ml-4"/>
      </div>

        <div className="flex flex-row justify-center gap-8 ">
      <button onClick={handleGoogleLogin} className="w-3/4 bg-white rounded-md border-2  border-black font-quick font-semibold  text-black flex flex-row justify-center items-center gap-2"> <span> <img src={Google} className="h-10 w-10"/></span> Google </button>
      </div>

            <p className="font-quick font-semibold  mx-auto mt-2 "> Already Have an Account? <NavLink to="/"> <span className="font-quick font-bold hover:underline cursor-pointer">Log In.</span></NavLink></p>

            </form>  


            <img src={SignupImage} className="rounded-md shadow-md object-cover hidden lg:block"/>



        </div>

        <div>
            {
                isPopupVisible && 
                    <Popup message="User Created Successfully" onClose={closePopup} />
                
            }

        </div>

        <Footer/>

        </div>
    );

};

export default Signup;