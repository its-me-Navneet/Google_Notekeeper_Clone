import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom"; 

const host = "http://localhost:5000";
// let email = "kumarnavneetkumar14@gmail.com";  


 const SignUp = () => {  

    const [cred, setcred] = useState({name:"",email:"",password:""})   ;  
    const [IN, setIN] = useState(0) 
    let navigate=useNavigate();
    useEffect(() => {
       
    if(localStorage.getItem("email")!=null) {
    
        navigate("/");
    }
  }, [])

    function handlechange(e) {

          setcred((prev)=>{
            return {...prev,[e.target.name]:e.target.value}
          }) 
        
    }

    async function handle(e){ 
        // console.log(cred); 

        e.preventDefault() ; 
    
        const response = await fetch(`${host}/api/auth/createUser`,{
          method: "POST",
    
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
      
          }, 
          body: JSON.stringify(cred),
        });
        const json = await response.json();
          if(json.error)
          alert(json.error) 
          else{
           setcred({name:"",email:"",password:""}); 
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
  return ( <div className='loginsignup' onSubmit={handle}>
    <form >
    <div className="form-field">
      <input type="text" placeholder="Name" name="name" onChange={handlechange} value={cred.name} required minLength={4} />
    </div>
    <div className="form-field">
      <input type="email" placeholder="Email "  name="email" onChange={handlechange} value={cred.email} required />
    </div>


    <div className="form-field">
      <input type="password" placeholder="Password" name="password" onChange={handlechange} value={cred.password} required  minLength={8}  />
    </div>
    <div className="form-field">
      <input type="password" placeholder="Confirm Password" required minLength={5}   value={cred.password}/>
    </div>

    <div className="form-field">
    <button style={IN?{backgroundColor:"red"}:null} className="btn" type="submit" onMouseOver={mouse} onMouseOut={mouseout}>
        Sign Up
      </button>
    </div>
  </form>
</div>
  )
}

export default SignUp
