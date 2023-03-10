// Requirents
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Configurations
const server = express();
server.use(cors());
server.use(express.json({ extended: false }));
mongoose.connect("mongodb://localhost:27017/registerLogin").then(() => {
    console.log("Conected to db!");
});

// Server

server.use("/api", require("./routes").router);

server.listen(3000, console.log("Server's Up!"));
