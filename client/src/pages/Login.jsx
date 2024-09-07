import React ,{ useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginImage from "../assets/AuShepherd.jpg";
import Google from "../assets/google.svg";
import { NavLink } from "react-router-dom";
import CryptoJS from "crypto-js";
import cryptoEncrypt from "../utils/cyptoEncrypt";
import { useNavigate } from "react-router-dom";



function Login() {



    const navigate = useNavigate();
    
    const [Formdata, setFormdata] = useState({
        email:'',
        password:'',
    })

   const handleChange = (e) => {

        setFormdata({
            ...Formdata,[e.target.id] : e.target.value
        })

    }

   const handleSubmit = async(e) => {

        e.preventDefault();

        

      



        try{
            const cryptoKey = await cryptoEncrypt();

            const apiUrl = import.meta.env.VITE_API_URL;
            const url = `${apiUrl}/users/login`;

            const encryptedPassword = CryptoJS.AES.encrypt(Formdata.password,cryptoKey).toString();

            const responsestore = await fetch(url,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify({...Formdata,password: encryptedPassword}),
            });

            const responsejson = await responsestore.json();
            console.log("checking response",responsejson);

            if(responsestore.status === 201) {

                const token = responsejson.jwt;
                sessionStorage.setItem('jwToken',token);
                
                console.log("navigating to home page");
                navigate('/home');
                           
            } else {
                alert("Invalid email or password");
                console.error('User Login failed', error);
            }

           

        } catch(error) {
            console.log("error occured while Logging In:",error)
        }
    }


    const handleGoogleLogin = async () => {

        window.location.href = 'http://localhost:3000/OauthRoutes/google/login';
    
        
      };


    return (
        <div className="flex flex-col min-h-screen ">
        <Header/>

        <div className="flex flex-col flex-grow lg:flex-row lg:justify-evenly bg-gradient-to-r from-sky-100 to-sky-200 py-16 rounded-md">

            <form className="flex flex-col justify-center px-6 sm:px-40 lg:px-20 lg:w-[40rem]" onSubmit={handleSubmit}>

            <p className="font-quick text-3xl font-bold mb-10">Log In to Your Account</p>

            <div className="mb-10">
            <label className="font-quick text-lg font-bold "> Email Address </label>
            <input id="email" type="email" value={Formdata.email} className="w-full border-gray-700  border rounded-md py-1 font-quick ps-4 font-semibold " onChange={handleChange}></input>
            </div>

            <div className="mb-10">
            <label className="font-quick text-lg font-bold "> Password </label>
            <input id="password" type="password" value={Formdata.password} className="w-full border-gray-700  border rounded-md py-1 font-quick ps-4 font-semibold" onChange={handleChange}></input>
            </div>

            <NavLink to="/forgot-password" className="font-quick font-bold gap-0 hover:underline cursor-pointer ml-auto mb-2"> Forgot Password ?</NavLink>

            <button className="w-full bg-black rounded-md py-1.5 font-quick font-semibold shadow-sm shadow-black text-white "> Log In</button>

            <p className="font-quick font-semibold  mx-auto mt-2 "> Don't Have an Account. <NavLink to="/Signup"> <span className="font-quick font-bold hover:underline cursor-pointer">Create a New Account.</span></NavLink></p>
            

            <div className="flex items-center justify-center w-full my-4">
        <hr className="border-t-2 border-black w-1/4 mr-4"/>
        <p className="text-black  font-anta text-md">continue with</p>
        <hr className="border-t-2 border-black w-1/4 ml-4"/>
      </div>

        <div className="flex flex-row justify-center gap-8 ">
      <button onClick={handleGoogleLogin} className="w-3/4 bg-white rounded-md border-2  border-black font-quick font-semibold  text-black flex flex-row justify-center items-center gap-2"> <span> <img src={Google} className="h-10 w-10"/></span> Google </button>
      </div>

            </form>  

            <img src={LoginImage} className="rounded-md shadow-md object-cover hidden lg:block"/>

        </div>



        <Footer/>

        </div>
    );
};

export default Login;