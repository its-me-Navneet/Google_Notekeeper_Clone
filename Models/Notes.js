const mongoose = require("mongoose") ;


const NoteSchema =new mongoose.Schema({
     
    title:{
         type:String,
         required:true
    },
    description:{
         type:String ,
         required:true
    },
    tag :{
      type:String,
       
    },
    date:{
        type:Date ,
        default:Date.now 
    },
    email:{   //  for identification of user
       type:String, 
        required:true
    }


}) 

 const User = mongoose.model('notes',NoteSchema) ;
module.exports = User ;