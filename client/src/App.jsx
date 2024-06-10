import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import Login from "./pages/Login";
import Home from "./pages/Home";
import Breeds from "./pages/Breeds";
import Adoption from "./pages/Adoption";
import Signup from "./pages/Signup";
import AdminSignup from "./pages/AdminSignup";
import Training from "./pages/Training";
import Blog from "./pages/Blog";
import Health from "./pages/Health";
import userRole from "./utils/userRole";
import NotAuthorized from "./utils/NotAuthorized";


const BreedsWithRole = userRole(Breeds, [ 'admin']);

 function App() {

 

  return (
    <>

    <Router>
      <Routes>


        <Route path="/home" element={<Home/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/AdminSignup" element={<AdminSignup/>} />
        <Route path="/Breeds" element={<BreedsWithRole />} />
        <Route path="/Training" element={<Training/>}/>
        <Route path="/Adoption" element={<Adoption/>} />
        <Route path="/Blog" element={<Blog/>} />
        <Route path="/Health" element={<Health/>} />
        <Route path="/noAuth" element={<NotAuthorized />} />

        


      </Routes>
      </Router>

     

   </>
  );

}; 

export default App;