import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";


function Admin () {


    return (
        
        <div className="flex flex-col min-h-screen ">

<Header/>




<div className="flex flex-col flex-grow lg:flex-row lg:justify-evenly bg-green-200 lg:bg-red-100 py-16  rounded-md">
<Sidebar/>


    <form className="flex flex-col justify-center px-6 sm:px-40 lg:px-20 lg:w-[40rem] " >

    <p className="font-quick text-3xl font-bold mb-10"> Add New Breeds</p>

   

    <div className="mb-10">
    <label className="font-quick text-lg font-bold "> Breed Name </label>
    <input type="text" className="w-full border-gray-700  border rounded-md py-1 font-quick ps-4 font-semibold " ></input>
    </div>

    <div className="mb-10">
    <label className="font-quick text-lg font-bold "> Type </label>
    <input type="text" className="w-full border-gray-700  border rounded-md py-1 font-quick ps-4 font-semibold " ></input>
    </div>

    <div className="mb-10">
    <label className="font-quick text-lg font-bold "> Characteristics </label>
    <input type="text" className="w-full border-gray-700  border rounded-md py-1 font-quick ps-4 font-semibold " ></input>
    </div>

    <div className="mb-10">
    <label className="font-quick text-lg font-bold "> Breed Name </label>
    <input type="text" className="w-full border-gray-700  border rounded-md py-1 font-quick ps-4 font-semibold " ></input>
    </div>

    
    <div>        
<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Upload file</label>
<input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>
    </div>


  

    <button  className="w-full bg-black rounded-md py-1.5 font-quick font-semibold shadow-sm shadow-black text-white "> Add Data</button>

    

    </form>  






</div>



<Footer/>

</div>

    );
};

export default Admin;