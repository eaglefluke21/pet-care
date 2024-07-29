import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import apiAxios from "../services/api";

const Breeds = () => {

    const [filter, setFilter] = useState({
        group:'',
        size:'',
        lifespan:'',
    })

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
        <div className="flex flex-col min-h-screen bg-white">
            <Header />
            <div className="flex flex-col gap-4 justify-center items-center flex-grow">
                <h1 className="text-sky-700 font-quick sm:text-3xl text-xl font-bold">Dog  Breeds.</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-2 ">
                    {breeds.map((breed) => (
                        <div key={breed._id} className=" flex flex-col bg-gradient-to-r from-cyan-100 to-blue-100 shadow-inner shadow-gray-200 p-4 rounded-lg font-quick   ">
                            <h2 className="text-xl font-bold">{breed.breedname}</h2>
                            <p><strong>Group:</strong> {breed.group}</p>
                            <p><strong>LifeSpan:</strong> {breed.lifespan}</p>
                            <p><strong>Size:</strong> {breed.size}</p>
                            <p><strong>Origin:</strong> {breed.origin}</p>
                            <p><strong>Description:</strong> {breed.description}</p>
                            {breed.image && <img  src={`${url}/uploads/${breed.image}`} alt={breed.breedname} className="w-auto h-auto sm:h-80 object-cover mt-auto" />}
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Breeds;