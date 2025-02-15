const express=require("express");
const connection=require("../connection");

const app=express.Router(); 

app.get("/theatre/:theatre_id",(req,res)=>{
const cityID=req.params.cityId;
 const query=`SELECT t.theatre_id, t.name as theatre_name, c.name as city_name 
                FROM theatre t 
                JOIN city c 
                ON c.city_id = t.city_id
                where t.city_id = ${cityId} 
                `;

connection.query(query,(error,result)=>{
    res.setHeader( "content-type","application/json");
    if(error){
        console.log(error);
        res.status(500).json({status:"error",data:"could not get data"});
    }else{
        res.json({status:"success",data:result});
    }
});

});






module.exports=app;