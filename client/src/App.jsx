import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import Login from "./pages/Login";
import Home from "./pages/Home";
import Breeds from "./pages/Breeds";
import Adoption from "./pages/Adoption";
import Signup from "./pages/Signup";
import AdminSignup from "./pages/AdminSignup";
import Admin from "./pages/Admin";
import Blog from "./pages/Blog";
import Health from "./pages/Health";
import userRole from "./utils/userRole";
import NotAuthorized from "./utils/NotAuthorized";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import GoogleLoginButton from "./components/GoogleLoginButton";
import GoogleCallback from "./components/GoogleCallback";


const RoleBase = userRole(Admin, [ 'admin']);

 function App() {

 

  return (
    <>

    <Router>
      <Routes>


        <Route path="/home" element={<Home/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/AdminSignup" element={<AdminSignup/>} />
        <Route path="/Breeds" element={<Breeds />} />
        <Route path="/Admin/*" element={<RoleBase />} />
        <Route path="/Adoption" element={<Adoption/>} />
        <Route path="/Blog" element={<Blog/>} />
        <Route path="/Health" element={<Health/>} />
        <Route path="/noAuth" element={<NotAuthorized />} />
        <Route path="/forgot-password" element= {<ForgotPassword/>} />
        <Route path="/reset-password/:token" element= {<ResetPassword/>} />
        <Route path="/google" element={<GoogleLoginButton/>}/>
        <Route path="/google-callback" element={<GoogleCallback />} />

        


      </Routes>
      </Router>

     

   </>
  );

}; 

export default App;