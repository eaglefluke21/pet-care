import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ForgotPasswordImage from "../assets/sulimovdog.jpg";
import Popup from "../components/Popup";

const ForgotPassword = () => {

    const[isPopupVisible , setPopupVisible] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{

            const backendurl = 'http://localhost:3000';
            const url = `${backendurl}/users/forgot-password`;

            const response = await fetch (url,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({email}),
            });

            const responseData = await response.json();
            console.log(responseData);

            if(response.status === 201) {
                setPopupVisible(true);                
            } else {
                console.error('Reset email failed',error);
            }

        } catch(error){
            console.log("error occoured",error);

        }

        
    };

    const closePopup = () => {
        setPopupVisible(false);
    };




return (

<div className="flex flex-col min-h-screen ">

<Header/>

<div className="flex flex-col flex-grow lg:flex-row lg:justify-evenly bg-gradient-to-r from-red-100 to-red-200 py-16 rounded-md">



    <form className="flex flex-col justify-center px-6 sm:px-40 lg:px-20 lg:w-[40rem] " onSubmit={handleSubmit}>

    <p className="font-quick text-3xl font-bold mb-10"> Forgot Password ?</p>

   

    <div className="mb-10">
    <label className="font-quick text-lg font-bold "> Email Address </label>
    <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} className="w-full border-gray-700  border rounded-md py-1 font-quick ps-4 font-semibold " ></input>
    </div>


  

    <button type="submit" className="w-full bg-black rounded-md py-1.5 font-quick font-semibold shadow-sm shadow-black text-white "> Send Reset Link</button>

    

    </form>  


    <img src={ForgotPasswordImage} className="rounded-md shadow-md object-cover hidden lg:block"/>



</div>

<div>
{
                isPopupVisible && 
                    <Popup message="Reset email sent successfully " onClose={closePopup} />
                
            }

</div>

<Footer/>

</div>

);
};

export default ForgotPassword;