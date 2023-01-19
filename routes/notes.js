const express =require("express") 
const router =express.Router() ;
const Note =require('../Models/Notes.js') ;
const { body, validationResult }  = require('express-validator'); 




// adding notes || Login required
router.post('/addnotes', [

     body('title','enter title of length atleast 3 ').isLength({ min: 3}),
     body('description','Description should be atleast of length 5').isLength({ min: 5 }),
],async(req,res)=>{

const errors =  validationResult(req);
//   console.log(errors) ; 
if(!errors.isEmpty()){
// console.log("Error in data") ;   

return res.status(400).json({errors:errors.array()}); 

}
try {
    
      const note=Note(req.body) ; 
       note.save() ;  
       res.status(200).json(); 
     
} catch (error) {
      
     return res.status(500).json("Internal error occured") ;
} 
})  

  // Fetching notes || Login required
router.post('/getnotes',async(req,res)=>{
     try {
           const email=req.body.email;
          //  console.log(req.body); 
           const notes=await Note.find({email:email}) 
             res.send(notes) ;
          
     } catch (error) {
          return res.status(500).json("Internal error occured") ;
     }


})

// Deleting notes || Login required 

router.delete('/deletenote/:id',async(req,res)=>{
   

     try { 
          
           const note=await Note.findById(req.params.id)  ; 
           if(!note){
             return  res.status(404).send("Not found!") ;     
           }

       
         const del=await Note.findByIdAndDelete(req.params.id) ; 
     
         res.json(note)
     } catch (error) { 
           console.log(error)
          return res.status(500).json("Internal error occured") ;
     }


})


module.exports=router ;