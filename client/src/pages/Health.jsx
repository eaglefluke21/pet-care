import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Health = () => {

   



    return (
        <div className="flex flex-col min-h-screen  bg-emerald-500 ">

        <Header/>
    
    
        <div className=' flex flex-col gap-4 justify-center items-center flex-grow  '>
    <h1 className='text-white font-quick  sm:text-3xl text-xl font-bold'>Health Care </h1>
    
    </div>
    
        <Footer/>
    
    
    </div>
    );
};




export default Health;