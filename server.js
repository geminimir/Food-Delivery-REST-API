const mysql = require('mysql')
const express = require('express')
const bodyparser = require('body-parser')
const config = require('./config')
var app = express()

app.use(bodyparser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

var mysqlConnection = mysql.createConnection(config.db_connection);

mysqlConnection.connect((err) => {
    if(!err) {
        console.log("Connection successful");
    } else {
        console.log(err.message);
    }
});

//Import Routes
const authRoute = require('./routes/auth');


//Route middlewares
app.use('/api/auth', authRoute);

const PORT = process.env.PORT || 8080;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
});