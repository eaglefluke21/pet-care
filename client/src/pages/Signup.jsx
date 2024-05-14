import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Google from "../assets/google.svg";
import Github from "../assets/github.svg";
import SignupImage from "../assets/gsdpups.jpg";
import { NavLink } from "react-router-dom";

function Signup() {

    return(
        <div className="flex flex-col min-h-screen ">

        <Header/>

        <div className="flex flex-col lg:flex-row lg:justify-evenly bg-orange-200 lg:bg-blue-100 py-16 rounded-md">

            <div className="flex flex-col justify-center px-6 sm:px-40 lg:px-20 lg:w-[40rem]">

            <p className="font-quick text-3xl font-bold mb-10"> Create a new account</p>

            <div className="mb-10">
            <label className="font-quick text-lg font-bold "> User Name </label>
            <input id="username"  className="w-full border-gray-700  border rounded-md py-1 font-quick ps-4 font-semibold "></input>
            </div>

            <div className="mb-10">
            <label className="font-quick text-lg font-bold "> Email Address </label>
            <input id="email"  className="w-full border-gray-700  border rounded-md py-1 font-quick ps-4 font-semibold "></input>
            </div>

            <div className="mb-10">
            <label className="font-quick text-lg font-bold "> Password </label>
            <input id="password"  className="w-full border-gray-700  border rounded-md py-1 font-quick ps-4 font-semibold"></input>
            </div>

           
            <button className="w-full bg-black rounded-md py-1.5 font-quick font-semibold shadow-sm shadow-black text-white "> Sign Up</button>
            <p className="font-quick font-semibold  mx-auto mt-2 "> Already Have an Account ? <NavLink to="/Login"> <span className="font-quick font-bold hover:underline cursor-pointer">Log In.</span></NavLink></p>

          
        

            </div>  

            <img src={SignupImage} className="rounded-md shadow-md object-cover invisible lg:visible"/>

        </div>



        <Footer/>

        </div>
    );

};

export default Signup;