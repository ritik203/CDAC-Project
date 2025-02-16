const express = require("express");
const mysql = require("mysql2");
const http = require("http");
const { Server } = require("socket.io");
const connection = require("../db");

const app = express();
app.use(express.json()); // ✅ Middleware to parse JSON requests

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// 🔹 WebSocket Handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("bookSeat", (seatData) => {
    console.log("Seat booked:", seatData);
    io.emit("seatBooked", seatData); // ✅ Notify all users
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// 🔹 Fetch booked seats for a show
app.get("/seats/booked/:showId", async (req, res) => {
  const { showId } = req.params;
  try {
    const [bookings] = await connection.promise().query(
      "SELECT seat_number FROM booking WHERE show_id = ?",
      [showId]
    );

    // Flatten the seat numbers into a single array
    const bookedSeats = bookings
      .flatMap(booking => booking.seat_number.split(", ")) // Split by ", " (comma-space)
      .map(seat => seat.trim()); // Trim whitespace

    res.json({ bookedSeats });
  } catch (error) {
    console.error("Error fetching booked seats:", error);
    res.status(500).json({ error: "Server error" });
  }
});



// 🔹 Book Seats (Single Entry for Multiple Seats)
app.post("/seats/book", async (req, res) => {
  const { showId, theatreId, userId, paymentId, selectedSeats } = req.body;

  if (!showId || !theatreId || !userId || !paymentId || !selectedSeats || selectedSeats.length === 0) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const seatNumbers = selectedSeats.join(", "); // Store all seats in a single row

    const [result] = await connection.promise().query(
      "INSERT INTO booking (no_of_seats, theatre_id, show_id, payment_id, user_id, seat_number) VALUES (?, ?, ?, ?, ?, ?)",
      [selectedSeats.length, theatreId, showId, paymentId, userId, seatNumbers]
    );

    // Fetch updated booked seats
    const [bookedSeats] = await connection.promise().query(
      "SELECT seat_number FROM booking WHERE show_id = ?",
      [showId]
    );

    io.emit("updateSeats", { showId, bookedSeats }); // ✅ WebSocket Update

    res.json({ success: true, message: "Booking confirmed", bookingId: result.insertId });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ error: "Server error during booking" });
  }
});

// 🔹 Payment API
app.post("/payment/:user_id", async (req, res) => {
  const { amount, method, transactionId } = req.body;
  const userId = req.params.user_id;
  const dateTime = new Date().toISOString().slice(0, 19).replace("T", " ");

  try {
    const [result] = await connection.promise().query(
      "INSERT INTO payment (amount, date_time, method, transaction_id, user_id) VALUES (?, ?, ?, ?, ?)",
      [amount, dateTime, method, transactionId, userId]
    );

    res.json({ success: true, paymentId: result.insertId });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Failed to process payment" });
  }
});

// 🔹 Get User Bookings
app.get("/bookings/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  

  const query = `
    SELECT 
      b.booking_id,
      u.name AS user_name,
      m.movie_name,
      s.show_date,
      t.start_time AS show_time,
      th.name AS theatre_name,
      b.no_of_seats,
      b.seat_number,
      b.booking_time,
      p.amount AS payment_amount,
      p.method AS payment_method,
      p.transaction_id
    FROM booking b
    JOIN user u ON b.user_id = u.user_id
    JOIN \`show\` s ON b.show_id = s.show_id
    JOIN movie m ON s.movie_id = m.movie_id
    JOIN time t ON s.time_id = t.time_id
    JOIN theatre th ON b.theatre_id = th.theatre_id
    JOIN payment p ON b.payment_id = p.payment_id
    WHERE b.user_id = ?;
  `;

  try {
    const [result] = await connection.promise().query(query, [userId]);
    res.json({ success: true, bookings: result });
    
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Could not fetch bookings" });
  }
});

// 🔹 Get Past Bookings
app.get("/bookings/past/:userId", async (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT 
    m.movie_name, 
    s.show_date, 
    b.no_of_seats,  
    p.amount AS payment_amount, 
    p.method AS payment_method, 
    p.transaction_id, 
    b.booking_time, 
    t.name AS theatre_name
FROM booking b
JOIN \`show\` s ON b.show_id = s.show_id  
JOIN movie m ON s.movie_id = m.movie_id 
JOIN theatre t ON b.theatre_id = t.theatre_id  
JOIN payment p ON b.payment_id = p.payment_id
WHERE b.user_id = ?
AND s.show_date <= CURDATE();

  `;

  try {
    const [result] = await connection.promise().query(query, [userId]);
    res.json({ success: true, pastBookings: result });
    console.log(res.json);
    
  } catch (error) {
    console.error("Error fetching past bookings:", error);
    res.status(500).json({ error: "Could not fetch past bookings" });
  }
});


// Start Server
server.listen(3000, () => console.log("✅ Server running on port 3000"));

module.exports = app;
