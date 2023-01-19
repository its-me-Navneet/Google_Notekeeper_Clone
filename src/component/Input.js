import React,{useState} from "react"

  export default function Input(props){ 
   
      const [title, settitle] = useState("") ; 
      const [description, setdescription] = useState("") ;  

       function handlechange(e){
                
            var newval=e.target.value ; 
             
         e.target.name=='title' ? settitle(newval):setdescription(newval) ;

       }
       
        
    

     return <div className="inputnotes">
              
    
          <input type="text" name="title" placeholder="Title" value={title}  onChange={handlechange}  />
           <textarea name="description" id="" cols="25" rows="3" placeholder="Description" value={description} onChange={handlechange} ></textarea>
           <button  disabled={title.length<3 || description.length<5} className="btn"  onClick={()=>{
               props.add(title,description) ; 
               setdescription("") ;
               settitle("") ;
           }}>Add</button>

     </div>
}