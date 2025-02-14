const mysql = require("mysql2");
const config = require("config");

const connectionDetails = {
    host     : config.get("server"),
    user     : config.get("username"),
    password : config.get("password"),
    database : config.get("dbname"),
    port     : config.get("port"),
}

const connection = mysql.createConnection(connectionDetails);

module.exports = connection;