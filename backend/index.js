const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Routes imported
const songsRoute = require("./routes/songsRoute");

app.use('api/songs', songsRoute);

var port = process.env.PORT || 8090;
app.listen(port);
console.log("Server up and running at port: "+ port);