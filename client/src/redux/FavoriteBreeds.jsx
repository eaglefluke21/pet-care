import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavoriteBreed } from './store';
import DeleteImage from "../assets/delete.svg";
import { useState } from 'react';


import { Card, CardContent } from "@/components/ui/card"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


const FavoriteBreeds = () => {
  const favoriteBreeds = useSelector((state) => state.favoriteBreeds);
  const dispatch = useDispatch();


  const apiUrl = import.meta.env.VITE_API_URL;



  console.log('Favorite Breeds:', favoriteBreeds);

  const [selectedBreed, setSelectedBreed] = useState(null);

  const handleImageClick = (breed) => {
      setSelectedBreed(breed);
  }

  return (
    
    <div>
      <h2 className="text-center font-quick font-bold text-3xl">Favorite Breeds</h2>
      {favoriteBreeds.length === 0 ? (
        <p className="text-center font-quick font-semibold ">No favorite breeds yet ...</p>
      ) : (
       
        <>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-2 ">
        {/* {favoriteBreeds.map((breed) => (
            <div key={breed._id} className=" flex flex-col bg-gradient-to-r from-cyan-100 to-blue-100 shadow-inner shadow-gray-200 p-4 rounded-lg font-quick   ">
                <h2 className="text-xl font-bold">{breed.breedname}</h2>
                <p><strong>Group:</strong> {breed.group}</p>
                <p><strong>LifeSpan:</strong> {breed.lifespan}</p>
                <p><strong>Size:</strong> {breed.size}</p>
                <p><strong>Origin:</strong> {breed.origin}</p>
                <p><strong>Description:</strong> {breed.description}</p>
                {breed.image && <img  src={`${apiUrl}/uploads/${breed.image}`} alt={breed.breedname} className="w-auto h-auto sm:h-80 object-cover mt-auto" />}
                <button 
                    onClick={() => dispatch(removeFavoriteBreed(breed._id))} // Dispatch the action
                    className="mt-2 p-2 bg-black text-white rounded"
                >
                    Remove
                </button>
            </div>
        ))} */}

{favoriteBreeds.map((breed) => (
            <Card key={breed._id} className="">
                <CardContent className=" group h-72  p-0 relative">
                    {breed.image && (
                        <img 
                            src={`${apiUrl}/uploads/${breed.image}`} 
                            alt={breed.breedname} 
                            className="w-full h-full object-cover rounded-md transition-transform duration-300 ease-in-out transform group-hover:scale-102 group-hover:shadow-lg " 
                            onClick={() => handleImageClick(breed)}
                        />
                    )}

                    <img
                    src={DeleteImage}
                        onClick={() => dispatch(removeFavoriteBreed(breed._id))} // Dispatch the action
                         className="absolute top-0 right-0 w-8 h-8 "
                          
                    />
                        
                </CardContent>
                
            </Card>
        ))}
          


    </div>

    {selectedBreed && (
                <Sheet open={!!selectedBreed} onOpenChange={() => setSelectedBreed(null)}>
                    
                    <SheetContent>
                        <div className="flex flex-col gap-4   ">
                            <h2 className="text-xl font-bold font-quick p-2 bg-gray-50 shadow-xs rounded-md">{selectedBreed.breedname}</h2>
                            <p className="font-quick p-2 bg-gray-50 shadow-xs rounded-md "><strong>Group:</strong> {selectedBreed.group}</p>
                            <p className="font-quick p-2 bg-gray-50 shadow-xs rounded-md"><strong>LifeSpan:</strong> {selectedBreed.lifespan}</p>
                            <p className="font-quick p-2 bg-gray-50 shadow-xs rounded-md"><strong>Origin:</strong> {selectedBreed.origin}</p>
                            <p className="font-quick p-2 bg-gray-50 shadow-xs rounded-md"><strong>Description:</strong> {selectedBreed.description}</p>
                        </div>
                    </SheetContent>
                </Sheet>
            )}


    
    </>


      )}
    </div>






  );
};

export default FavoriteBreeds;
