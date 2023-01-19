import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom" 
import '../App.css'  
import { useNavigate } from "react-router-dom"; 


export const Navbar = (props) => { 

  let navigate = useNavigate(); 
  const [user, setUser] = useState(null)  ;   

    function handle(){
       localStorage.removeItem('email');    
         setUser(null) ;     
         navigate("/login"); 
     }
    
     useEffect(()=>{ 
         
      setUser(localStorage.getItem("email"));  
    },[localStorage.getItem('email')])
     
     

               
   
  return (  

    <>
    <header>Note Keeper 
      
        <Link className='link'  to='/' role="button"> Home </Link> 
      
      {(!user) && <button className='navnbtn'>  <Link className='link' to='signup' role="button" > SignUp </Link> </button> }
      {(!user) && <button className='navnbtn'> <Link className='link' to='login' role="button" > Login  </Link> </button> } 
      {user &&  <button className='navnbtn' onClick={handle}> Logout </button>}
    </header>  
    </>
    
  )
}
