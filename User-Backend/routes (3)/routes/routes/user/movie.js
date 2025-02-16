const express = require("express");
const connection = require("../db");

const app = express.Router();


app.get("/theatre/:id", (request, response) => {
    const { id } = request.params;
    console.log(id);
    
    //const cityId = request.params.cityId;

    if (!id) {
        return response.status(400).json({ status: "error", data: "City ID is required" });
    }

    const query = `
        SELECT 
            t.theatre_id, 
            c.city_id,
            t.name AS theatre_name, 
            c.name AS city_name 
        FROM theatre t 
        JOIN city c ON c.city_id = t.city_id
        WHERE t.city_id = ?`;

    connection.query(query, [id], (error, result) => {
        response.setHeader("Content-Type", "application/json");
        if (error) {
            console.log(error);
            response.status(500).json({ status: "error", data: "Could not get theatres" });
        } else if (result.length === 0) {
            response.json({ status: "success", data: [], message: "No theatres found for this city" });
        } else {
            response.json({ status: "success", data: result });
        }
    });
});

app.get("/show", (request, response) => {
    const { movieName, theatreName, showDate } = request.query;
    if (!movieName || !theatreName || !showDate) {
        return response.status(400).json({ status: "error", data: "Missing required parameters" });
    }

    const query = `
        SELECT 
        s.show_id,  -- Include the show_id from the 'show' table
        t.name AS theatre_name,
        m.movie_name,
        DATE_FORMAT(s.show_date, '%Y-%m-%d') AS show_date,  -- Converts date to 'YYYY-MM-DD'
        TIME_FORMAT(ti.start_time, '%H:%i') AS start_time,
        TIME_FORMAT(ti.end_time, '%H:%i') AS end_time
        FROM theatre t
        JOIN movie_theatre mt ON t.theatre_id = mt.theatre_id
        JOIN movie m ON mt.movie_id = m.movie_id
        JOIN \`show\` s ON mt.movie_id = s.movie_id AND mt.theatre_id = t.theatre_id
        JOIN time ti ON s.time_id = ti.time_id
        WHERE 
        m.movie_name = ? 
        AND t.name = ? 
        AND s.show_date = ?`;

    connection.query(query, [movieName, theatreName, showDate], (error, result) => {
        response.setHeader("Content-Type", "application/json");
        console.log(result);
        if (error) {
            console.log(error);
            response.status(500).json({ status: "error", data: "Could not get shows" });
        } else if (result.length === 0) {
            response.json({ status: "success", data: [], message: "No shows found for the given details" });
        } else {
            response.json({ status: "success", data: result });
        }
    });
});



module.exports = app;


// Method :- Get
// URL :- /movie/show
// Query :-
// SELECT 
//   t.name AS theatre_name,
//   m.movie_name,
//   s.show_date,
//   TIME_FORMAT(ti.start_time, '%H:%i') AS start_time,
//   TIME_FORMAT(ti.end_time, '%H:%i') AS end_time
// FROM 
//   theatre t
// JOIN 
//   movie_theatre mt ON t.theatre_id = mt.theatre_id
// JOIN 
//   movie m ON mt.movie_id = m.movie_id
// JOIN 
//   show s ON mt.movie_id = s.movie_id AND mt.theatre_id = t.theatre_id
// JOIN 
//   time ti ON s.time_id = ti.time_id
// WHERE 
//   m.movie_name = ?
//   AND t.name = ?
//   AND s.show_date ?


//   Response Body :- theatre_name
//        movie_name
//        show_date
//        start_time
//        end_time
//        number_of_shows