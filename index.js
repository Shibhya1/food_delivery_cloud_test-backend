const express=require('express');
const mongoose=require('mongoose');
const connectMongo=require('./db');

const app=express();
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:5173")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With,Content-Type,Accept"
    );
    next();
})
connectMongo();
app.use(express.json())
app.use('/api' , require("./Routes/CreateUser"))
app.use('/api' , require("./Routes/DisplayData"))
app.use('/api' , require("./Routes/OrderData"))
app.listen(3000, ()=>{
    console.log("Listening on port 3000");
})