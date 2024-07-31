import React, { useState } from "react";
import apiAxios from "../services/api";
import { useEffect } from "react";

const AdminBreed = () => {

    const [breeds, setBreeds] = useState([]);
    const [selectedBreed, setSelectedBreed] = useState(null);

    const [Formdata, setFormdata] = useState({
        breedname: '',
        group: '',
        lifespan: '',
        size: '',
        origin: '',
        description: '',
        image: null,

    });



    useEffect(() => {
        fetchBreeds();
    } 
        , []);

    const fetchBreeds = async () => {
        try {
            const response = await apiAxios.get('/users/breeds');
            if (response.status === 200) {
                setBreeds(response.data);
            } else {
                console.log(`Error: ${response.data.error}`);
            }
        } catch (err) {
            console.log('Error occurred during fetching', err);
        }
    };


    const handleChange = (e) => {
        const { id, value, type, files } = e.target;

        setFormdata({
            ...Formdata,
            [id]: type === 'file' ? files[0] : value,
        });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        const data = new FormData();
        Object.keys(Formdata).forEach(key => {
            data.append(key, Formdata[key]);
        });

        try {
            const response = await apiAxios.post('/users/adminbreeds', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Response', response.data);

            console.log("Response status", response.status);

            if (response.status === 201) {
                console.log("item inserted successfully");
                alert("Breed Added");
                fetchBreeds();
                setSelectedBreed(null);
               resetForm();
            } else {
                console.log(`Error: ${response.data.error}`);
            }

        } catch (error) {
            console.error("error occured in catch block", error);

        }



    };


    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!selectedBreed) return;

        const data = new FormData();
        Object.keys(Formdata).forEach(key => {
            data.append(key, Formdata[key]);
        });

        try {
            const response = await apiAxios.put(`/users/adminbreeds/${selectedBreed._id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                console.log("Item updated successfully");
                alert("Breed Updated");
                fetchBreeds();
                setSelectedBreed(null);
              resetForm();
            } else {
                console.log(`Error: ${response.data.error}`);
            }
        } catch (error) {
            console.error("Error occurred in catch block", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await apiAxios.delete(`/users/adminbreeds/${id}`);
            if (response.status === 200) {
                console.log("Item deleted successfully");
                alert("Breed Deleted");
                fetchBreeds();
                setSelectedBreed(null);
                resetForm();
            } else {
                console.log(`Error: ${response.data.error}`);
            }
        } catch (error) {
            console.error("Error occurred in catch block", error);
        }
    };

    const handleSelect = (breed) => {
        console.log("Selected breed data:", breed); // Debugging log
        setSelectedBreed(breed);
        setFormdata({
            breedname: breed.breedname,
            group: breed.group,
            lifespan: breed.lifespan,
            size: breed.size,
            origin: breed.origin,
            description: breed.description,
            image: breed.image, 
        });
        console.log("Form data after selection:", {
            breedname: breed.breedname,
            group: breed.group,
            lifespan: breed.lifespan,
            size: breed.size,
            origin: breed.origin,
            description: breed.description,
            image: breed.image,
        }); 
    };

    const resetForm = () => {
        setFormdata({
            breedname: '',
            group: '',
            lifespan: '',
            size: '',
            origin: '',
            description: '',
            image: null,
        });
    };
    




    return (

        <section className=" rounded-md  ">
            <div className="py-8 px-4 mx-10 max-w-2xl ">
                <h2 className="mb-4 text-xl font-bold text-gray-900 font-quick">Add New Breed</h2>

                <form onSubmit={selectedBreed ? handleUpdate : handleSubmit}>

                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

                        <div className="sm:col-span-2">

                            <label className="block mb-2 text-sm font-bold text-gray-900 font-quick ">Breed Name</label>

                            <input type="text" id="breedname" value={Formdata.breedname} className="bg-white  text-gray-900 text-sm rounded-lg  block w-full p-2.5 " onChange={handleChange} placeholder="name" required />
                        </div>

                        <div className="w-full">
                            <label className="block mb-2 text-sm font-bold text-gray-900 font-quick ">Group</label>
                            <select type="text" id="group" value={Formdata.group} className="bg-white  text-gray-900 text-sm rounded-lg  block w-full p-2.5 " onChange={handleChange} placeholder="group" required >

                            <option >Select category</option>
                                <option value="Herding">Herding</option>
                                <option value="Hound">Hound</option>
                                <option value="Working">Working</option>
                                <option value="Guard">Guard</option>
                                </select>
                        </div>

                        <div className="w-full">
                            <label className="block mb-2 text-sm font-bold text-gray-900 font-quick">LifeSpan</label>
                            <input type="text" id="lifespan" value={Formdata.lifespan} className="bg-white  text-gray-900 text-sm rounded-lg  block w-full p-2.5 " onChange={handleChange} placeholder="lifespan" required />
                        </div>
                        <div>

                            <label className="block mb-2 text-sm font-bold text-gray-900 font-quick">Size</label>
                            <select name="size" id="size" value={Formdata.size} className="bg-white  text-gray-900 text-sm rounded-lg  focus:border-gray-500 block w-full p-2.5 " onChange={handleChange} required>
                                <option >Select category</option>
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                                <option value="giant">Giant</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-bold text-gray-900 font-quick">Origin</label>
                            <input type="text" id="origin" value={Formdata.origin} className="bg-white  text-gray-900 text-sm rounded-lg  block w-full p-2.5" onChange={handleChange} placeholder="0" required />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block mb-2 text-sm font-bold text-gray-900 font-quick">Description</label>
                            <textarea type="text" id="description" value={Formdata.description} className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg   focus:border-gray-500 " onChange={handleChange} placeholder="Any other details about the breed."></textarea>
                        </div>

                        <div>

                            <label className="block mb-2 text-sm font-bold text-gray-900 font-quick " >Image</label>
                            <input id="image" className="block w-full mb-5  p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 " onChange={handleChange} type="file" />

                        </div>

                    </div>

                    <button type="submit" className="w-full bg-black rounded-md py-1.5 mt-3 font-quick font-semibold shadow-sm shadow-black text-white ">

                        {selectedBreed ? 'Update Breed' : 'Add Breed'}

                    </button>
                </form>
            </div>


            <div className="py-8 px-4 mx-10 max-w-2xl">
                <h2 className="mb-4 text-xl font-bold text-gray-900 font-quick">Breeds List</h2>
                <ul className="list-disc pl-5">
                    {breeds.map((breed) => (
                        <li key={breed._id} className="mb-2">
                            <span className="font-bold">{breed.breedname}</span>
                            <button
                                onClick={() => handleSelect(breed)}
                                className="ml-4 bg-black text-white font-quick px-2 py-1 rounded-md"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(breed._id)}
                                className="ml-2 bg-black text-white font-quick px-2 py-1 rounded-md"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>





        </section>


    )




};

export default AdminBreed;