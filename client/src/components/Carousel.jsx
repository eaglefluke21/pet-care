import React from "react";
import SliderCarousel from "./SliderCarousel";

const Carousel = () => {


    return (
        <>
        
            <div className="flex flex-row justify-center items-center  rounded-md py-6" >

               

                <div className="flex flex-col justify-center   items-center sm:flex-row sm:gap-10">

                    <div className="max-w-xl  ">
                        
                    <SliderCarousel/>

                   
                           
    
                    </div>

                    <div className="sm:flex sm:flex-col sm:gap-20 sm:w-[32rem] sm:mb-20  "> 

                        <h1 className=" text-3xl text-center font-quick text-black hidden sm:block">
                        New Pup, New Parent? Find Everything You Need to Raise a Happy, Healthy Dog
                        </h1>


                    </div>


                </div>



            </div>




        </>
    );

}

export default Carousel;