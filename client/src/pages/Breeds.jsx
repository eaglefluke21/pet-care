import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import apiAxios from "../services/api";
import { useDispatch } from "react-redux";
import { addFavoriteBreed } from "../redux/store.js";
import FavoriteBreeds from "../redux/FavoriteBreeds.jsx";

const Breeds = () => {

    const dispatch = useDispatch();
    const url = 'http://localhost:3000';

    const [breeds, setBreeds] = useState([]); 
    const [filteredBreeds, setFilteredBreeds] = useState([]);
    const [filters, setFilters] = useState({
        group:"",
        size:""
    });
   
    const [showFavorites ,setShowFavorites] = useState(false);

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


    useEffect(() => {
        const filterBreeds = () => {

            let filtered = breeds;

            if (filters.group) {
                filtered = filtered.filter(breed => breed.group === filters.group);
            }

            if(filters.size){
                filtered = filtered.filter(breed=> breed.size === filters.size);

            }

            setFilteredBreeds(filtered);

        };

        filterBreeds();

    },[filters, breeds]);

    const handleFilterChange = (e) => {
        const {name, value}  = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]:value
        }));

    };

    const handleAddFavorite = (breed) => {
        console.log('Dispatching addFavoriteBreed action for breed:', breed);
        dispatch(addFavoriteBreed(breed));
    }

    const toggleShowFavorites = () =>{
        setShowFavorites(!showFavorites);
    }

    
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header />
            <div className="flex flex-col gap-4 justify-center items-center flex-grow">
                <h1 className="text-sky-700 font-quick sm:text-3xl text-xl font-bold">Dog  Breeds.</h1>


                <button 
                    onClick={toggleShowFavorites}
                    className="mt-2 p-2 bg-blue-500 text-white rounded"
                >
                    {showFavorites ? 'Show All Breeds' : 'Show Favorite Breeds'}
                </button>

                {showFavorites ? (
                    <FavoriteBreeds />
                ) : (
                    <>
                <div className="mb-4">
                    <label className="mr-2">Group:</label>
                    <select
                        name="group"
                        value={filters.group}
                        onChange={handleFilterChange}
                        className="p-2 border rounded"
                    >
                        <option value="">All</option>
                        <option value="Herding">Herding</option>
                        <option value="Hound">Hound</option>
                        <option value="Working">Working</option>
                        <option value="Guard">Guard</option>
                        {/* Add more options as needed */}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="mr-2">Size</label>
                    <select
                        name="size"
                        value={filters.size}
                        onChange={handleFilterChange}
                        className="p-2 border rounded"
                    >
                        <option value="">All</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="giant">Giant</option>
                        {/* Add more options as needed */}
                    </select>
                </div>










                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-2 ">
                    {filteredBreeds.map((breed) => (
                        <div key={breed._id} className=" flex flex-col bg-gradient-to-r from-cyan-100 to-blue-100 shadow-inner shadow-gray-200 p-4 rounded-lg font-quick   ">
                            <h2 className="text-xl font-bold">{breed.breedname}</h2>
                            <p><strong>Group:</strong> {breed.group}</p>
                            <p><strong>LifeSpan:</strong> {breed.lifespan}</p>
                            <p><strong>Size:</strong> {breed.size}</p>
                            <p><strong>Origin:</strong> {breed.origin}</p>
                            <p><strong>Description:</strong> {breed.description}</p>
                            {breed.image && <img  src={`${url}/uploads/${breed.image}`} alt={breed.breedname} className="w-auto h-auto sm:h-80 object-cover mt-auto" />}
                            <button 
                                onClick={() => handleAddFavorite(breed)} // Dispatch the action
                                className="mt-2 p-2 bg-black text-white rounded"
                            >
                                Add to Favorites
                            </button>
                        </div>
                    ))}
                </div>
              </>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Breeds;