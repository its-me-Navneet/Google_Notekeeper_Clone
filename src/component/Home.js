import React,{useEffect} from 'react'
import { Navbar } from "./Navbar";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import App from '../App';
import SignUp from './SignUp';
import Login from './Login';
import { useNavigate } from "react-router-dom"; 
import Alert from './Alert';

 const Home = () => { 

  
  
  return (
    <div>
        <Router>
        <Navbar /> 
          
          
        <Routes> 
        
          <Route path="/" element={<App />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Router>
    </div>
  )
}
    export default Home;