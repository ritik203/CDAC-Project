const express = require("express");
const connection=require('../DBUtils/connections');


const app = express.Router();

function getCurrentDateTime() {
    const now = new Date();
    
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(now.getDate()).padStart(2, '0');
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

app.post("/payment/:userId", (request, response) => {
    const userId = request.params.userId;
    const { amount, method, transactionId } = request.body;

    const query = `INSERT INTO payment(amount, date_time, method, transaction_id, user_id) VALUES(?, ?, ?, ?, ?)`;

    connection.query(query, 
        [amount, getCurrentDateTime(), method, transactionId, userId], 
        (error, result) => {
            response.setHeader("content-type", "application/json");

            if(error) {
                console.log(error);
                response.status(500).json({status : "error", data : "failed to do payment entry"});
                response.end();
            }
            else {
                response.json({status : "success", data : result});
            }
        });
});

app.post("/:userId", (request, response) => {
    const userId = request.params.userId;
    const { noOfSeats, theatreId, showId, paymentId} = request.body;

    const query = `
    INSERT INTO moviedb.booking 
    (no_of_seats, booking_time, theatre_id, show_id, payment_id, user_id)
    VALUES
    (?, ?, ?, ?, ?, ?);
    `;

    connection.query(query, 
        [noOfSeats, getCurrentDateTime(), theatreId, showId, paymentId, userId],
        (error, result) => {
            response.setHeader("content-type", "application/json");

            if(error) {
                console.log(error);
                response.status(500).json({status : "error", data : "could not book seats"});
                response.end();
            }
            else {
                response.json({status : "success", data : result});
            }
    });

});

app.get("/:userId", (request, response) => {
    const userId = request.params.userId;

    const query = `
        SELECT 
            b.booking_id,
            u.name AS user_name,
            m.movie_name,
            s.show_date,
            t.start_time AS show_time,
            th.name AS theatre_name,
            b.no_of_seats,
            b.booking_time,
            p.amount AS payment_amount,
            p.method AS payment_method,
            p.transaction_id
        FROM 
            moviedb.booking b
        JOIN 
            moviedb.user u ON b.user_id = u.user_id
        JOIN 
            moviedb.show s ON b.show_id = s.show_id
        JOIN 
            moviedb.movie m ON s.movie_id = m.movie_id
        JOIN 
            moviedb.time t ON s.time_id = t.time_id
        JOIN 
            moviedb.theatre th ON b.theatre_id = th.theatre_id
        JOIN 
            moviedb.payment p ON b.payment_id = p.payment_id
        WHERE 
            b.user_id = ?;
    `;

    connection.query(query, [userId], (error, result) => {
        response.setHeader("content-type", "application/json");

        if(error) {
            console.log(error);
            response.status(500).json({status : "error", data : "could not book seats"});
            response.end();
        }
        else {
            response.json({status : "success", data : result});
        }
    });
});

// app.post("/seat/:userId", (request, response) => {
//     const userId = request.params.userId;
//     const { seatno } = request.body;


// });

module.exports = app;