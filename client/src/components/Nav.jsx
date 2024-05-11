import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const NavLinks = () => {

    return (
        <>
            <NavLink to="/" className=" sm:text-xl"> Home</NavLink>
            <NavLink to="/Breeds" className=" sm:text-xl"> Breeds</NavLink>
            <NavLink to="/Adoption" className=" sm:text-xl">Adoption</NavLink>
            <NavLink to="/Training" className=" sm:text-xl">Training</NavLink>
            <NavLink to="/Health" className=" sm:text-xl"> Health & Care</NavLink>
            <NavLink to="/Blog"className=" sm:text-xl"> Blog</NavLink>
            <NavLink to="/Login" className="lg:ml-auto lg:pr-8">  <button className="bg-black sm:py-2 sm:px-3 py-1 px-8 rounded-md text-sm font-anta text-white "> Log In</button> </NavLink>
            </>
    )

};

const Nav = () => {
    const [isOpen, SetIsOpen] = useState(false);

    const toggleNavbar = () => {
        SetIsOpen(!isOpen);
    };


    return (
        <>
        <nav className="">
        <div className="hidden sm:flex  gap-x-10 ">
        <NavLinks/>
        </div>

        <div className="sm:hidden">
            <button onClick={toggleNavbar} className="pr-8"> 
            {isOpen ? <button className="   text-3xl font-comic text-black" > X </button> :<button className="bg-black py-2 px-3 rounded-lg text-sm font-comic text-white "> Menu</button>}
            </button>
        </div>
        
        </nav>
        {isOpen && (
            <div className="flex basis-full flex-col items-center gap-2 sm:hidden">
                <NavLinks/>
            </div>
        )}
        
        </>
    )
};

export default Nav;