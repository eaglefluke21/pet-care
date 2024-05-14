import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginImage from "../assets/AuShepherd.jpg";
import Google from "../assets/google.svg";
import Github from "../assets/github.svg";
import { NavLink } from "react-router-dom";

function Login() {

    return (
        <div className="flex flex-col min-h-screen ">
        <Header/>

        <div className="flex flex-col lg:flex-row lg:justify-evenly bg-blue-200 lg:bg-orange-100 py-16 rounded-md">

            <div className="flex flex-col justify-center px-6 sm:px-40 lg:px-20 lg:w-[40rem]">

            <p className="font-quick text-3xl font-bold mb-10">Log In to Your Account</p>

            <div className="mb-10">
            <label className="font-quick text-lg font-bold "> Email Address </label>
            <input id="email"  className="w-full border-gray-700  border rounded-md py-1 font-quick ps-4 font-semibold "></input>
            </div>

            <div className="mb-10">
            <label className="font-quick text-lg font-bold "> Password </label>
            <input id="password"  className="w-full border-gray-700  border rounded-md py-1 font-quick ps-4 font-semibold"></input>
            </div>

            <p className="font-quick font-bold gap-0 hover:underline cursor-pointer ml-auto mb-2"> Forgot Password ?</p>

            <button className="w-full bg-black rounded-md py-1.5 font-quick font-semibold shadow-sm shadow-black text-white "> Log In</button>

            <p className="font-quick font-semibold  mx-auto mt-2 "> Don't Have an Account <NavLink to="/Signup"> <span className="font-quick font-bold hover:underline cursor-pointer">Create a New Account.</span></NavLink></p>
            

            <div className="flex items-center justify-center w-full my-4">
        <hr className="border-t-2 border-black w-1/4 mr-4"/>
        <p className="text-black  font-anta text-md">Or Continue with</p>
        <hr className="border-t-2 border-black w-1/4 ml-4"/>
      </div>

        <div className="flex flex-row justify-center gap-8 ">
      <button className="w-1/2 bg-white rounded-md border-2  border-black font-quick font-semibold  text-black flex flex-row justify-center items-center gap-2"> <span> <img src={Google} className="h-10 w-10"/></span> Google </button>
      <button className="w-1/2 bg-white rounded-md border-2  border-black font-quick font-semibold  text-black flex flex-row justify-center items-center gap-2"> <span> <img src={Github} className="h-8 w-8" /></span>Github</button>
      </div>

            </div>  

            <img src={LoginImage} className="rounded-md shadow-md object-cover invisible lg:visible"/>

        </div>



        <Footer/>

        </div>
    );
};

export default Login;