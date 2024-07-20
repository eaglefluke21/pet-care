import React from "react";

const AdminBlog = () => {

    return (

        <section className=" rounded-md  ">
            <div className="py-8 px-4 mx-10 max-w-2xl ">
                <h2 className="mb-4 text-xl font-bold text-gray-900 font-quick">Write Blog.</h2>
                
                <form >

                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

                        <div className="sm:col-span-2">

                            <label className="block mb-2 text-sm font-bold text-gray-900 font-quick ">Blog Title</label>

                            <input type="text"  className="bg-white  text-gray-900 text-sm rounded-lg  block w-full p-2.5 " placeholder="title" required />
                        </div>

                     
                        <div className="sm:col-span-2">
                            <label className="block mb-2 text-sm font-bold text-gray-900 font-quick">Description</label>
                            <textarea  name="description"  className="block px-2.5 py-20 w-full text-sm text-gray-900 bg-white rounded-lg   focus:border-gray-500 " placeholder="Blog Content"></textarea>
                        </div>

                        <div>

                        <label class="block mb-2 text-sm font-bold text-gray-900 font-quick " >Image</label>
                        <input class="block w-full mb-5  p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "  type="file"/>

                        </div>

                    </div>

                    <button type="submit" className="w-full bg-black rounded-md py-1.5 mt-3 font-quick font-semibold shadow-sm shadow-black text-white "> Create Blog </button>

                       
                </form>
            </div>
        </section>
    )

}

export default AdminBlog;