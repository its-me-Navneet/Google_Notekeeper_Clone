const mongoose =  require("mongoose") 

 mongoose.set('strictQuery', false);
const uri ="mongodb://localhost:27017/Notebook" ;
 
async function db(){ 
    const a=await mongoose.connect(uri) ;
       mongoose.connect(uri,function(err){
        if(err) {
             console.log("error");
        }
        else
         console.log("Connected...........")
    }) ;
}

module.exports = db;