const express =require("express");
const connection=require('../DBUtils/connections');

const app=express.Router();

app.get("/city/:city_id",(req,res)=>{

    const {city_id}=req.params;
    const query="select * from theatre where city_id=?";

    connection.query(query,[city_id],(err,result)=>{
        res.setHeader("content-type","application/json");
        if(err){
         console.log(err);
         res.status(500).json({status:"error"});

        }  else{
            res.json({status:"success",data:result});
        }
      })
});

module.exports=app;