const express = require("express");
const connection = require("../db");

const app = express.Router();

app.post("/login", (request, response) => {
    const { email, password } = request.body;
  
    const query = "SELECT * FROM user WHERE email = ? AND password = ?";
  
    connection.query(query, [email, password], (error, result) => {
      response.setHeader("content-type", "application/json");
      if (error) {
        console.log(error);
        response.status(500).json({ status: "error", message: "Internal server error" });
      } else {
        if (result.length === 0) {
          response.status(401).json({ status: "error", message: "Invalid credentials" });
        } else {
          response.status(200).json({ status: "success", data: result[0] });
        }
      }
    });
  });
  

app.post("/register", (request, response) => {
    const { username, email, mobile, password } = request.body;

    const query1 = `SELECT * FROM user WHERE email = ?`;

    connection.query(query1, [email], (error, result) => {
        if (error) {
            console.error("Error checking user:", error);
            response.status(500).json({ status: "error", message: "Database error" });
            return;
        }

        // Check if user already exists
        if (result.length > 0) {
            response.json({ status: "user already exists" });
            return;
        }

        // If user doesn't exist, insert into the database
        const query2 = `INSERT INTO user(name, email, mobile, password, role) VALUES(?, ?, ?, ?, ?)`;

        connection.query(query2, [username, email, mobile, password, 'user'], (insertError, insertResult) => {
            if (insertError) {
                console.error("Error inserting user:", insertError);
                response.status(500).json({ status: "error", message: "Database error" });
                return;
            }

            // Success response
            response.json({ status: "success", userId: insertResult.insertId });
        });
    });
});

app.put("/:id", (request, response) => {
    const userId = request.params.id;
    const { name, email, password, mobile } = request.body;
    const query = `
        UPDATE user
        SET 
        name = ?,
        email = ?,
        mobile = ?,
        password = ?
        WHERE user_id = ?
    `;

    connection.query(query, [name, email, mobile, password, userId], (error, result) => {
        response.setHeader("content-type", "application/json");
        if(error) {
            console.log(error);
            response.write(error);
            response.end();
        }
        else {
            response.write(JSON.stringify(result));
            response.end();
        }
    });
});

module.exports = app;