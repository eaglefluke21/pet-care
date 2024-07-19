import React from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { useState, useEffect } from "react";
import One from "../assets/swissdog.jpg";
import Two from "../assets/noviascotia.jpg";
import Three from "../assets/bernese.jpg";
import Four from "../assets/Frenchie.jpg";
import Five from "../assets/englishspaniel.jpg";
import sOne from "../assets/adoptdog.jpg";
import sTwo from "../assets/Dalmatian.jpg";
import sThree from "../assets/bordercollie.jpg";
import sFour from "../assets/AuShepherd.jpg";
import sFive from "../assets/sulimovdog.jpg";


const images = [One,Two,Three,Four,Five]; 

const simages = [sOne,sTwo,sThree,sFour,sFive];

const SliderCarousel = ({  autoSlide = false }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth >= 640);

  useEffect(()=>{
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth >= 640);
    };

    window.addEventListener("resize", handleResize);
    return() => {
      window.removeEventListener("resize", handleResize);
    }
  },[]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  

  useEffect(() => {
    if (!autoSlide) return;

    const slideInterval = setInterval(nextSlide);

    return () => clearInterval(slideInterval);
  }, [ autoSlide, nextSlide]);

  const displayedImages = isSmallScreen ? simages : images;

  

  return (
    <div className="w-full overflow-hidden relative rounded-md"> {/* Container */}
      <div className="flex transition-transform ease-out duration-500"> {/* Images */}
        {displayedImages.map((image, index) => (
          <img key={index} src={image} alt="" className={`  w-[30rem] h-[32rem] sm:w-[40rem] sm:h-[32rem] object-cover ${currentSlide === index ? "block" : "hidden"}`} />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4"> {/* Controls */}
        <button className=" bg-white bg-opacity-50 text-black rounded-full p-2 " onClick={prevSlide}>
          <ChevronLeft size={20} />
        </button>
        <button className=" bg-white bg-opacity-50 text-black rounded-full p-2" onClick={nextSlide}>
          <ChevronRight size={20} />
        </button>
      </div>
     
    </div>
  );
};

export default SliderCarousel;
