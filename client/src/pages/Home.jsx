import Footer from "../components/Footer";
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import { jwtDecode } from 'jwt-decode'
import Cookies from "universal-cookie";
import defaultText from "../utils/jwtKey.js";


function Home() {

    const jwtsecret = defaultText;
    
    const cookies =  new Cookies();

    const userCookie = cookies.get('usercookie');

    console.log("checking If user cookie exists:",userCookie);

    if (userCookie) {
        const decodedPayload = jwtDecode(userCookie, jwtsecret);
        const userId = decodedPayload.user.id;

        console.log("user active",userId);
    }



    return (
        <div className="flex flex-col min-h-screen ">

            <Header />

            <div className=" flex flex-col items-center flex-grow justify-center  rounded-lg bg-stone-200  lg:pb-0">

                <h1 className=" text-xl text-center font-anta text-black pt-4 lg:hidden ">

                    Welcome to Cannie Companion

                </h1>

                <Carousel />


            </div>

            <Footer />



        </div>


    )
}

export default Home;
