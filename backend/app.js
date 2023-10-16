const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const port=process.env.PORT || 4000;

app.use(cors());
app.get('/',(req,res)=>{
    res.send('Hello from server');
})
app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})