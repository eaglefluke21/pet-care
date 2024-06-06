import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import Login from "./pages/Login";
import Home from "./pages/Home";
import Breeds from "./pages/Breeds";
import Adoption from "./pages/Adoption";
import Signup from "./pages/Signup";
import Training from "./pages/Training";
import Blog from "./pages/Blog";
import Health from "./pages/Health";

 function App() {


  return (
    <>

    <Router>
      <Routes>


        <Route path="/home" element={<Home/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/Breeds" element={<Breeds/>} />
        <Route path="/Training" element={<Training/>}/>
        <Route path="/Adoption" element={<Adoption/>} />
        <Route path="/Blog" element={<Blog/>} />
        <Route path="/Health" element={<Health/>} />

        


      </Routes>
      </Router>

     

   </>
  );

}; 

export default App;