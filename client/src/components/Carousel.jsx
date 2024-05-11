import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breeddog from "../assets/Retriever.jpg";
import Adoptdog from "../assets/adoptdog.jpg";
import LeftNav from "../assets/leftnav.svg";
import RightNav from "../assets/rightnav.svg";


const Carousel = () => {
    const slides = [

        {
            src: Breeddog,
            route: '/Breeds',
            name: 'Breeds',
            description: 'Explore a diverse range of dog breeds, from popular ones like Golden Retrievers and Labrador Retrievers to lesser-known breeds such as the Shiba Inu and Basenji. Learn about their unique characteristics, temperament, grooming needs, and ideal living environments.'
        },
        {
            src: Adoptdog,
            route: '/Adoption',
            name: 'Dog Adoption',
            description: 'Discover the heartwarming journey of dog adoption and the profound impact it can have on both the dog and the adopter. Learn about the adoption process, including finding the right match, preparing your home, and integrating your new furry companion into your family. Experience the joy of giving a shelter dog a second chance at a happy life.'
        },

    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [transitioning, setTransitioning] = useState(false);


    const nextSlide = () => {
        setTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
            setTransitioning(false);
        }, 500);
    }

    const prevSlide = () => {
        setTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)
        }, 500);
    };

    return (
        <>
            <div className="flex flex-row justify-center sm:items-center  rounded-md py-6 " >

                <img src={LeftNav} onClick={prevSlide}
                    className="h-10 w-8 cursor-pointer mt-20 mr-auto sm:mt-0" />

                <div className="flex flex-col sm:flex-row  sm:items-center sm:gap-6">

                    <div>
                        {/* <p className="text-xl font-anta text-center py-2"> {slides[currentIndex].name} </p> */}
                        <Link to={slides[currentIndex].route} >
                            <img className={`h-80 w-96 sm:w-full sm:h-full shadow-md shadow-white object-cover rounded-md transition-transform duration-700 transform hover:scale-95 ${transitioning ? 'scale-105' : 'scale-100'}`}
                                src={slides[currentIndex].src}
                                alt={slides[currentIndex].name} />
                        </Link>

                    </div>

                    <div className="sm:flex sm:flex-col sm:gap-20"> 

                        <h1 className=" text-3xl text-center font-anta text-black invisible sm:visible ">
                        Welcome to Cannie Companion
                        </h1>

                        <p className="lg:text-justify  py-3 font-quick text-xl lg:text-2xl sm:items-center sm:w-96 lg:w-[40rem] lg:ml-8"> {slides[currentIndex].description} </p>

                    </div>


                </div>


                <img src={RightNav} onClick={nextSlide}
                    className="h-10 w-8 cursor-pointer mt-20 ml-auto sm:mt-0" />


            </div>




        </>
    );

}

export default Carousel;