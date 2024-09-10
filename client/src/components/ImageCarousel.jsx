import React from "react";

import sOne from "../assets/adoptdog.jpg";
import sTwo from "../assets/Dalmatian.jpg";
import sThree from "../assets/bordercollie.jpg";
import sFour from "../assets/AuShepherd.jpg";
import sFive from "../assets/sulimovdog.jpg";

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"



const ImageCarousel = () => {


    const Images = [sOne,sTwo,sThree,sFour,sFive];

    return (

        <div className="flex flex-row justify-center items-center  rounded-md py-6" >

            <div className="flex flex-col justify-center   items-center sm:flex-row sm:gap-10">

            <Carousel className="w-full max-w-xl">
  <CarouselContent>
    {Images.map((image, index) => (
      <CarouselItem key={index}>
        <div>
          <Card>
            <CardContent className=" h-80 sm:h-[28rem]  p-0 ">
              <img src={image}
               alt={`Image ${index + 1}`} 
               className="w-full h-full object-cover rounded-md"
               />
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious className="hidden sm:flex"/>
  <CarouselNext className="hidden sm:flex" />
</Carousel>


                </div>

                <div className="sm:flex sm:flex-col sm:gap-20 sm:w-[32rem] sm:mb-20  ">

                    <h1 className=" text-xl text-center font-quick font-medium text-black hidden sm:block">
                        New Pup, New Parent? Find Everything You Need to Raise a Happy, Healthy Dog
                    </h1>


                </div>


            </div>

       

    );

}

export default ImageCarousel;