const connectToDatabase =require('./db.js')
const express = require('express' ) ; 
const { connect } = require('mongoose');

var cors = require('cors')
var app = express()
 
app.use(cors())
const a= connectToDatabase() ;

const port=5000 ; 

app.use(express.json())   // to get the body element json





app.use('/api/auth',require('./routes/auth')) ;
app.use('/api/notes',require('./routes/notes')) ;

app.listen(port,()=>{
    console.log(`Server is listening at ${port}`)
})
