const express = require("express");
const dotenv = require('dotenv').config();
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/error-handler");
connectDB();

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Routes imported
const songsRoute = require("./routes/songsRoute");
const dashboardRoute = require("./routes/dashboardRoute");

app.use('/api/songs', songsRoute);
app.use('/api/stats', dashboardRoute);
app.use(errorHandler);

var port = process.env.PORT || 8090;
app.listen(port);
console.log("Server up and running at port: "+ port);