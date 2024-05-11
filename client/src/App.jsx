import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import Login from "./pages/Login";
import Home from "./pages/Home";
import Breeds from "./pages/Breeds";
import Adoption from "./pages/Adoption";

 function App() {


  return (
    <>

    <Router>
      <Routes>


        <Route path="/" element={<Home/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Breeds" element={<Breeds/>} />
        <Route path="/Adoption" element={<Adoption/>} />
        


      </Routes>
      </Router>

     

   </>
  );

}; 

export default App;