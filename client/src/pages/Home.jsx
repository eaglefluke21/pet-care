import Footer from "../components/Footer";
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Home() {

    const navigate = useNavigate();

    useEffect( ( )=> {
        if(!sessionStorage.getItem('jwToken')){
            navigate('/')
        }
        

    } , []);


    const handlelogout = () => {

        sessionStorage.removeItem('jwToken');
        
    }

    return (
        <div className="flex flex-col min-h-screen ">

    <Header />

    <div className=" flex flex-col items-center  justify-center  rounded-lg  lg:pb-0">

       

        <h1 className=" text-sm text-center font-quick text-black pt-4 font-medium p-2 sm:hidden ">

        New Pup, New Parent? Find Everything You Need to Raise a Happy, Healthy Dog

        </h1>

        <Carousel />

       


    </div>

    <Footer />



</div>


    )
}

export default Home;
