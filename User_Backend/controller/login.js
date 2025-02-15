const express=reuire('express');
const { response } = require('express');
const connection=require('../connection');
const app=express.Router();

app.post("/login",(req,res)=>{
    const {email,password}=req.body;
    const query='SELECT * From user WHERE email=? AND password=?';
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

app.post("/register",(req,res)=>{
    const{username,email,mobile,password}=req.body;


    const checkUserQuery='SELECT * From user WHERE email=?';

    connection.query(query,[email],(error,result)=>{  
        if(error){
            console.log("error checking user",error);
            return res.status(500).json({status:"error",messsage:"Database Error"});

        }
        //if user already exists
        if(result.length>0){
            return res.json({status:"error",message:"User Already Exists"});
        }
        //if user does not exist or new user
        const insertUserQuery='Insert into user(username,email,mobile,password)values(?,?,?,?)';

        connection.query(insertUserQuery,[username,email,mobile,password],(insertionError,insertionResult)=>{
            if(insertionError){
              return res.status(500).json({status:"error",message:"Database Error"});
            } 

        // fetch newly inserted users  details last inserted id
        const getUserQuery=`SELECT * From user WHERE user_id= LAST_INSERT_ID()`;

        connection.query(getUserQuery,(fetchError,fetchResult)=>{
            if(fetchError){
                return res.status(500).json({status:"error",message:"Database Error"});
            }
        //return newly inserted user details
        return res.json({status:"success",data:fetchResult[0]});

           });          
        });  
    });
});