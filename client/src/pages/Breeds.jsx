import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import apiAxios from "../services/api";
import { useDispatch } from "react-redux";
import { addFavoriteBreed } from "../redux/store.js";
import FavoriteBreeds from "../redux/FavoriteBreeds.jsx";
import Addimage from "../assets/add.svg";


import { Card, CardContent } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"


import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"





const Breeds = () => {

    const apiUrl = import.meta.env.VITE_API_URL;

    // Favourite breeds logic 
    const dispatch = useDispatch();

    const [showFavorites, setShowFavorites] = useState(false);

    const handleAddFavorite = (breed) => {
        console.log('Dispatching addFavoriteBreed action for breed:', breed);
        dispatch(addFavoriteBreed(breed));
    }

    const toggleShowFavorites = () => {
        setShowFavorites(!showFavorites);
    }


    // Breeds and filtered Breeds logic
    const [breeds, setBreeds] = useState([]);
    const [filteredBreeds, setFilteredBreeds] = useState([]);
    const [filters, setFilters] = useState({
        group: "",
        size: ""
    });



    useEffect(() => {

        const fetchBreeds = async () => {
            try {
                const response = await apiAxios.get('/users/breeds');


                if (response.status === 200) {
                    console.log('Response', response.data);

                    console.log("Response status", response.status);

                    setBreeds(response.data);

                } else {
                    console.log(`Error: ${response.data.error}`);
                }


            } catch (err) {
                console.log('Error occured during fetching', err);
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

            if (filters.size) {
                filtered = filtered.filter(breed => breed.size === filters.size);

            }

            setFilteredBreeds(filtered);

        };

        filterBreeds();

    }, [filters, breeds]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));

    };




    // Sheet Logic 

    const [selectedBreed, setSelectedBreed] = useState(null);

    const handleImageClick = (breed) => {
        setSelectedBreed(breed);
    }



    //command Dialog filter change 

    const [groupDialogOpen, setGroupDialogOpen] = useState(false);
    const [sizeDialogOpen, setSizeDialogOpen] = useState(false);

    const handleGroupSelect = (group) => {
        handleFilterChange({ target: { name: 'group', value: group } });
        setGroupDialogOpen(false);
    }

    const handleSizeSelect = (size) => {
        handleFilterChange({ target: { name: 'size', value: size } });
        setSizeDialogOpen(false);
    };





    return (

        <div className="flex flex-col min-h-screen bg-white">

            <Header />

            <div className="flex flex-col gap-4 justify-center items-center flex-grow">

                <Button
                    onClick={toggleShowFavorites}
                    className="font-quick font-semibold border-2 border-gray-800 hover:bg-black hover:text-white  hover:shadow-custom-inner-sky-400  w-60"
                    variant="outline"
                >
                    {showFavorites ? 'Show All Breeds' : 'Show Favorite Breeds'}
                </Button>





                {showFavorites ? (
                    <FavoriteBreeds />
                ) : (

                    <>

                        <div className="flex flex-row ">

                            <div className="font-quick font-semibold">


                                <Button onClick={() => setGroupDialogOpen(true)} className="bg-black w-32 mx-2">Group</Button>


                                <CommandDialog className="w-72 sm:w-96" open={groupDialogOpen} onOpenChange={setGroupDialogOpen}>

                                    <CommandInput placeholder="Search by group" />
                                    <CommandList>
                                        <CommandItem onSelect={() => handleGroupSelect("")}>All</CommandItem>
                                        <CommandItem onSelect={() => handleGroupSelect("Herding")}>Herding</CommandItem>
                                        <CommandItem onSelect={() => handleGroupSelect("Hound")}>Hound</CommandItem>
                                        <CommandItem onSelect={() => handleGroupSelect("Working")}>Working</CommandItem>
                                        <CommandItem onSelect={() => handleGroupSelect("Guard")}>Guard</CommandItem>
                                    </CommandList>

                                </CommandDialog>

                            </div>

                            <div className="font-quick font-semibold">
                                <Button onClick={() => setSizeDialogOpen(true)} className="bg-black w-32 mx-2">Size</Button>


                                <CommandDialog className="w-72 sm:w-96" open={sizeDialogOpen} onOpenChange={setSizeDialogOpen}>

                                    <CommandInput placeholder="Search by size" />
                                    <CommandList>
                                        <CommandItem onSelect={() => handleSizeSelect("")}>All</CommandItem>
                                        <CommandItem onSelect={() => handleSizeSelect("small")}>small</CommandItem>
                                        <CommandItem onSelect={() => handleSizeSelect("medium")}>medium</CommandItem>
                                        <CommandItem onSelect={() => handleSizeSelect("large")}>large</CommandItem>
                                        <CommandItem onSelect={() => handleSizeSelect("giant")}>giant</CommandItem>
                                    </CommandList>

                                </CommandDialog>
                            </div>

                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-2">
                            {filteredBreeds.map((breed) => (
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
                                            src={Addimage}
                                            onClick={() => handleAddFavorite(breed)} // Dispatch the action
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








        </div>
    );
};

export default Breeds;