import React from "react";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import AdminBreed from "../components/AdminBreed";
import AdminAdopt from "../components/AdminAdopt";
import AdminBlog from "../components/AdminBlog";
import AdminHealthCare from "../components/AdminHealthCare";


function Admin () {
const navigate = useNavigate();
const [activeComponent, setActiveComponent] = useState('AdminBreed');

const handleSidebarClick = (component) => {
    console.log('checking if handleSidebarClick is invoked');
    setActiveComponent(component);

};

let ComponentToRender;
switch(activeComponent) {
    case'AdminAdopt':
    ComponentToRender = AdminAdopt;
    break;
    case'AdminBlog':
    ComponentToRender = AdminBlog;
    break;
    case'AdminHealthCare':
    ComponentToRender = AdminHealthCare
    break;
    case 'AdminBreed':
        default:
            ComponentToRender = AdminBreed;
            break;
}

    return (
        
        <div className="flex flex-col min-h-screen ">

<Header/>


<Sidebar onNavClick={handleSidebarClick}/>

<div className="flex flex-col flex-grow lg:flex-row lg:justify-evenly bg-yellow-300 py-16  rounded-md">

<ComponentToRender/>



</div>



<Footer/>

</div>

    );
};

export default Admin;