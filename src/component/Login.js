import React, { useState,useEffect } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom"; 




const host = "http://localhost:5000";


const Login = () => {
  const [cred, setcred] = useState({ email: "", password: "" });   
  const [IN, setIN] = useState(0)
 
  let navigate=useNavigate();
  useEffect(() => {
       
    if(localStorage.getItem("email")!=null) {
    
        navigate("/");
    }
  }, [])
  
  function handlechange(e){ 
    setcred((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  } 

  async function handle(e) {
    e.preventDefault();

    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(cred),
    }); 

    const json = await response.json();
   
    if (json.error) alert(json.error);
    else {
      //  setcred({name:"",email:"",password:""});
         localStorage.setItem("email",cred.email) ;   
        
          navigate("/");
         
    } 
    
  } 
   function mouse(){
    
      setIN(1) ;
   }
   function mouseout(){
    
    setIN(0) ;
 }

  return (
    <div className="loginsignup">
      <form onSubmit={handle}>
        <div className="form-field">
          <input
            type="email"
            placeholder="Email "
            name="email"
            onChange={handlechange}
            value={cred.email}
            required
          />
        </div>

        <div className="form-field">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handlechange}
            value={cred.password}
            required
          />
        </div>

        <div className="form-field">
          <button style={IN?{backgroundColor:"red"}:null} className="btn" type="submit" onMouseOver={mouse} onMouseOut={mouseout}>
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
