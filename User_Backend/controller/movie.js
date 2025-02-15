const express=require("express");
const connection=require('../DBUtils/connections');

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


app.get("/show",(req,res)=>{
    const {movieName,theatreName,showDate}=req.body;

    const query=`   SELECT 
        t.name AS theatre_name,
        m.movie_name,
        s.show_date,
        TIME_FORMAT(ti.start_time, '%H:%i') AS start_time,
        TIME_FORMAT(ti.end_time, '%H:%i') AS end_time
    FROM 
        theatre t
    JOIN 
        movie_theatre mt ON t.theatre_id = mt.theatre_id
    JOIN 
        movie m ON mt.movie_id = m.movie_id
    JOIN 
        \`show\` s ON mt.movie_id = s.movie_id AND mt.theatre_id = t.theatre_id
    JOIN 
        time ti ON s.time_id = ti.time_id
    WHERE 
        m.movie_name = ?
        AND t.name = ?
        AND s.show_date = ?
    `;

   connection.query(query,[movieName,theatreName,showDate],(error,result)=>{
    res.setHeader("content-type","application/json");
    if(error){
        console.log(error);
        res.status(500).json({status:"error",data:"could not get data"});
    }else{
        res.json({status:"success",data:result});
    }
   });





});



module.exports=app;