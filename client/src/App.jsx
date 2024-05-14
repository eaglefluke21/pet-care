import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import Login from "./pages/Login";
import Home from "./pages/Home";
import Breeds from "./pages/Breeds";
import Adoption from "./pages/Adoption";
import Signup from "./pages/Signup";
import Training from "./pages/Training";

 function App() {


  return (
    <>

    <Router>
      <Routes>


        <Route path="/" element={<Home/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/Breeds" element={<Breeds/>} />
        <Route path="/Training" element={<Training/>}/>
        <Route path="/Adoption" element={<Adoption/>} />
        


      </Routes>
      </Router>

     

   </>
  );

}; 

export default App;