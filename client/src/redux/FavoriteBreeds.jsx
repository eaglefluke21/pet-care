import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavoriteBreed } from './store';

const FavoriteBreeds = () => {
  const favoriteBreeds = useSelector((state) => state.favoriteBreeds);
  const dispatch = useDispatch();

  const url = 'http://localhost:3000';


  console.log('Favorite Breeds:', favoriteBreeds);

  return (
    <div>
      <h2 className="text-center font-quick font-bold text-3xl">Favorite Breeds</h2>
      {favoriteBreeds.length === 0 ? (
        <p className="text-center font-quick font-semibold ">No favorite breeds yet ...</p>
      ) : (
       

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-2 ">
        {favoriteBreeds.map((breed) => (
            <div key={breed._id} className=" flex flex-col bg-gradient-to-r from-cyan-100 to-blue-100 shadow-inner shadow-gray-200 p-4 rounded-lg font-quick   ">
                <h2 className="text-xl font-bold">{breed.breedname}</h2>
                <p><strong>Group:</strong> {breed.group}</p>
                <p><strong>LifeSpan:</strong> {breed.lifespan}</p>
                <p><strong>Size:</strong> {breed.size}</p>
                <p><strong>Origin:</strong> {breed.origin}</p>
                <p><strong>Description:</strong> {breed.description}</p>
                {breed.image && <img  src={`${url}/uploads/${breed.image}`} alt={breed.breedname} className="w-auto h-auto sm:h-80 object-cover mt-auto" />}
                <button 
                    onClick={() => dispatch(removeFavoriteBreed(breed._id))} // Dispatch the action
                    className="mt-2 p-2 bg-black text-white rounded"
                >
                    Remove
                </button>
            </div>
        ))}
    </div>
      )}
    </div>






  );
};

export default FavoriteBreeds;
