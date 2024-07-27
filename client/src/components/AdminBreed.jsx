import React, { useState } from "react";
import apiAxios from "../services/api";

const AdminBreed = () => {


    const [Formdata, setFormdata] = useState({
        breedname: '',
        group:'',
        lifespan:'',
        size:'',
        origin:'',
        description:'',
        image:null,

    });

    const handleChange = (e) => {
        const {id ,value ,type, files} = e.target;

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

        try{
            const response = await apiAxios.post('/users/adminbreeds',data,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Response', response.data);

            console.log("Response status", response.status);

            if (response.status === 201){
                console.log("item inserted successfully");
                alert("Breed Added");
            } else {
                console.log(`Error: ${response.data.error}`);
            }

        } catch(error){
            console.error("error occured in catch block",error);

        }

        

    }





    return  (

<section className=" rounded-md  ">
            <div className="py-8 px-4 mx-10 max-w-2xl ">
                <h2 className="mb-4 text-xl font-bold text-gray-900 font-quick">Add New Breed</h2>
                
                <form onSubmit={handleSubmit} >

                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

                        <div className="sm:col-span-2">

                            <label className="block mb-2 text-sm font-bold text-gray-900 font-quick ">Breed Name</label>

                            <input type="text" id="breedname" name={Formdata.breedname} className="bg-white  text-gray-900 text-sm rounded-lg  block w-full p-2.5 " onChange={handleChange} placeholder="name" required />
                        </div>

                        <div className="w-full">
                            <label className="block mb-2 text-sm font-bold text-gray-900 font-quick ">Group</label>
                            <input type="text" id="group" name={Formdata.group} className="bg-white  text-gray-900 text-sm rounded-lg  block w-full p-2.5 " onChange={handleChange} placeholder="group" required />
                        </div>

                        <div className="w-full">
                            <label className="block mb-2 text-sm font-bold text-gray-900 font-quick">LifeSpan</label>
                            <input type="text" id="lifespan" name={Formdata.lifespan} className="bg-white  text-gray-900 text-sm rounded-lg  block w-full p-2.5 " onChange={handleChange} placeholder="lifespan" required />
                        </div>
                        <div>

                            <label className="block mb-2 text-sm font-bold text-gray-900 font-quick">Size</label>
                            <select  name="size" id="size" value={Formdata.size} className="bg-white  text-gray-900 text-sm rounded-lg  focus:border-gray-500 block w-full p-2.5 " onChange={handleChange} required>
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
                            <textarea  name="description" id="description" value={Formdata.description} className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg   focus:border-gray-500 " onChange={handleChange} placeholder="Any other details about the breed."></textarea>
                        </div>

                        <div>

                        <label class="block mb-2 text-sm font-bold text-gray-900 font-quick " >Image</label>
                        <input  id="image"  class="block w-full mb-5  p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 " onChange={handleChange} type="file"/>

                        </div>

                    </div>

                    <button type="submit" className="w-full bg-black rounded-md py-1.5 mt-3 font-quick font-semibold shadow-sm shadow-black text-white "> Add Breed </button>

                       
                </form>
            </div>
        </section>


    )



    
};

export default AdminBreed;