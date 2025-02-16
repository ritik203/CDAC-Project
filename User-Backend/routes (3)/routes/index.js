const express = require("express");
const cors = require("cors");
const config = require("config");
const loginApp = require("./routes/user/login");
const movieApp = require("./routes/user/movie");
const citiesApp = require("./routes/user/cities");
const bookingApp = require("./routes/user/booking");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/booking", bookingApp);
app.use("/user", loginApp);
app.use("/city", citiesApp);
app.use("/movie", movieApp);

app.listen(config.get("httpport"), () => {console.log("Server started on port 4545");});