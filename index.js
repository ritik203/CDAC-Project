const express=require('express');
const cors=require('cors');
const config=require('./User_Backend/DBUtils/constants.json');

const loginApp=require('./User_Backend/controller/login');
const citiesApp=require('./User_Backend/controller/cities');
const bookingApp=require('./User_Backend/controller/booking');
const movieApp=require('./User_Backend/controller/movies');
const theatreApp=require('./User_Backend/controller/theatre');

const app =express();

app.use(cors());
app.use(express.json());
app.use("/booking",bookingApp);
app.use("/cities",citiesApp);
app.use("/login",loginApp);
app.use("/movies",movieApp);
app.use("/theatre",theatreApp);

app.listen(config.get("httpport"),()=>{  
    console.log(`Server started on port 7777`);
}   );

