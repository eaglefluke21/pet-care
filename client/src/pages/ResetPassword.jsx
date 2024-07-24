import React from "react";
import { useState } from "react";
import {useParams} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Popup from "../components/Popup";
import ResetPasswordImage from "../assets/frenchbulldog.jpg"

const ResetPassword = () => {
    const {token} = useParams();
    const [password, setPassword] = useState('');
    const[isPopupVisible , setPopupVisible] = useState(false);

   

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{

            const backendurl = 'http://localhost:3000';
            const url = `${backendurl}/users/reset-password/${token}`;
            const response = await fetch (url,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({password}),
            });

            const responseData = await response.json();
            console.log(responseData);

            if(response.status === 201) {
                setPopupVisible(true);                
            } else {
                console.error('Reset password failed:', error);
            }


        } catch(error){
        
            console.log('Error Reseting Email ',error);

        }
    };
    const closePopup = () => {
        setPopupVisible(false);
    };




return (
    // <div>
    //     <p> Reset Password</p>
    //     <form onSubmit={handleSubmit}>
    //         <label>
    //             New Password:
    //             <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)}
    //             required
    //             />
    //         </label>
    //         <button type="submit">Reset Password</button>
    //     </form>

    //     {message && <p> {message}</p>}

    // </div>

    <div className="flex flex-col min-h-screen ">

<Header/>

<div className="flex flex-col flex-grow lg:flex-row lg:justify-evenly bg-gradient-to-r from-cyan-100 to-cyan-200 py-16 rounded-md">



    <form className="flex flex-col justify-center px-6 sm:px-40 lg:px-20 lg:w-[40rem] " onSubmit={handleSubmit}>

    <p className="font-quick text-3xl font-bold mb-10"> Set New Password ?</p>

   

    <div className="mb-10">
    <label className="font-quick text-lg font-bold "> New Password </label>
    <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} className="w-full border-gray-700  border rounded-md py-1 font-quick ps-4 font-semibold " ></input>
    </div>


  

    <button type="submit" className="w-full bg-black rounded-md py-1.5 font-quick font-semibold shadow-sm shadow-black text-white "> Create New Password</button>

    

    </form>  


    <img src={ResetPasswordImage} className="rounded-md shadow-md object-cover hidden lg:block"/>



</div>

<div>
{
                isPopupVisible && 
                    <Popup message="Password reset succesfull " onClose={closePopup} />
                
            }

</div>

<Footer/>

</div>



);
};

export default ResetPassword;