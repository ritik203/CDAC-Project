const express=reuire('express');
const { response } = require('express');
const connection=require('../connection');
const app=express.Router();

app.post("/login",(req,res)=>{
    const {email,password}=req.body;
    const query='SELECT * From users WHERE email=? AND password=?';
    connection.query(query,[email,password],(error,result)=>{
        response.setHeader('Content-Type','application/json');
        if(error){
            response.status(500).json({status: "error",message:"Internal Server Error"});
        }else{
            if(result.length===0){
                response.status(400).json({status: "error",message:"Invalid Email or Password"});
            
            }else{
                response.status(200).json({status: "success",data:result[0]});
            }
        }
    });

});

