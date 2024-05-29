import Footer from "../components/Footer";
import Header from "../components/Header";
import Carousel from "../components/Carousel";

function Home() {

    return (
        <div className="flex flex-col min-h-screen ">

            <Header/>

            <div className=" flex flex-col items-center  rounded-lg bg-stone-200 pb-36 lg:pb-0">

                <h1 className=" text-xl text-center font-anta text-black pt-4 lg:hidden ">

                    Welcome to Cannie Companion

                </h1>

                <Carousel/>


            </div>

            <Footer />

           

        </div>


    )
}

export default Home;
