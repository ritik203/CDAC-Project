const express=require('express');
const connection=require('../DBUtils/connections');
const app=express.Router();


app.get('/',(req,res)=>{
    
    const query="select * from city";

    connection.query(query,(error,result)=>{
        res.setHeader("content-type","application/json");
        if(error){
            res.status(500).json({status:"error",data:"could not get cities"});
        }else{
            res.json({status:"success",data:result});
        }
    });

});

app.get('/:cityname',(req,res)=>{

    const {cityname}=req.params;
    const query=`select * from city where name=?`;

    connection.query(query,[cityname],(error,result)=>{
    connection.setHeader("content-type","application/json");
    if(error){
        res.status(500).json({status:"error",data:"could not get city"});

    }else{
        res.json({status:"success",data:result[0]});

    }
});
});
module.exports=app;