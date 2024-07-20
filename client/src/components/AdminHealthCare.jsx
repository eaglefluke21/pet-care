import React from "react";

const AdminHealthCare = () => {

    return (

        <section className=" rounded-md  ">
            <div className="py-8 px-4 mx-10 max-w-2xl ">
                <h2 className="mb-4 text-xl font-bold text-gray-900 font-quick">Dog Health Information</h2>
                
                <form >

                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

                        <div className="sm:col-span-2">

                            <label className="block mb-2 text-sm font-bold text-gray-900 font-quick ">Dog Name</label>

                            <input type="text"  className="bg-white  text-gray-900 text-sm rounded-lg  block w-full p-2.5 " placeholder="name" required />
                        </div>

                        <div className="sm:col-span-2">

                         <label className="block mb-2 text-sm font-bold text-gray-900 font-quick ">Vaccination Status</label>

                            <input type="text"  className="bg-white  text-gray-900 text-sm rounded-lg  block w-full p-2.5 " placeholder="status" required />
                        </div>
                     
                        <div className="sm:col-span-2">

                         <label className="block mb-2 text-sm font-bold text-gray-900 font-quick ">Medication</label>

                            <input type="text"  className="bg-white  text-gray-900 text-sm rounded-lg  block w-full p-2.5 " placeholder="status" required />
                        </div>

                        <div>

                        <label class="block mb-2 text-sm font-bold text-gray-900 font-quick " >Image</label>
                        <input class="block w-full mb-5  p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "  type="file"/>

                        </div>

                    </div>

                    <button type="submit" className="w-full bg-black rounded-md py-1.5 mt-3 font-quick font-semibold shadow-sm shadow-black text-white "> Add Data </button>

                       
                </form>
            </div>
        </section>
    )

}

export default AdminHealthCare;