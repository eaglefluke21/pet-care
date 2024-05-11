import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Breeds= () => {

    const [dogImage, setdogImage] = useState('');


    useEffect(() => {
        const fetchDogImage = async() =>{
            try{
                const datarecived = await fetch('https://api.thedogapi.com/v1/images/search');
                if(!datarecived.ok) {
                    throw new Error('Failed to fetch the images');
                }
                const datajson = await datarecived.json();

                const  imagesUrl = datajson[0].url;
                setdogImage(imagesUrl);
            }
            catch(error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchDogImage();

    },[]);



    return (
        <div className="flex flex-col min-h-screen ">

            <Header/>

            <div>
                <h2> Random Dog Image</h2>
                {dogImage && <img src={dogImage} className="h-80 w-96 rounded-md" alt="Dog"/>}
            </div>

            <Footer/>


        </div>
    );
};

export default Breeds;