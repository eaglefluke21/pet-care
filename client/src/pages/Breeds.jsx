import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import apiAxios from "../services/api";

const Breeds = () => {


    const url = 'http://localhost:3000';

    const [breeds, setBreeds] = useState([]); 
   
    useEffect(() => {
        
        const fetchBreeds = async () => {
            try {
                const response = await apiAxios.get('/users/breeds'); 
               

            if (response.status === 200){
                console.log('Response', response.data);

                console.log("Response status", response.status);

                setBreeds(response.data);
                
            } else {
                console.log(`Error: ${response.data.error}`);
            }

                
            } catch (err) {
                    console.log('Error occured during fetching',err);
            }
        };

        fetchBreeds(); 
    }, []); 

    
    return (
        <div className="flex flex-col min-h-screen bg-sky-500">
            <Header />
            <div className="flex flex-col gap-4 justify-center items-center flex-grow">
                <h1 className="text-white font-quick sm:text-3xl text-xl font-bold">Look for your favourite Breeds.</h1>
                <div className="flex flex-wrap justify-center gap-4">
                    {breeds.map((breed) => (
                        <div key={breed._id} className="bg-white p-4 rounded-lg shadow-md ">
                            <h2 className="text-xl font-bold">{breed.breedname}</h2>
                            <p><strong>Group:</strong> {breed.group}</p>
                            <p><strong>LifeSpan:</strong> {breed.lifespan}</p>
                            <p><strong>Size:</strong> {breed.size}</p>
                            <p><strong>Origin:</strong> {breed.origin}</p>
                            <p><strong>Description:</strong> {breed.description}</p>
                            {breed.image && <img src={`${url}/uploads/${breed.image}`} alt={breed.breedname} className="w-full h-auto mt-2" />}
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Breeds;