const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const loadMap = require('./mapLoader.js')

async function main() {
   
    const map2D = await loadMap;
    
    io.on("connection", (socket) => {
        console.log("User connected", socket.id)

        socket.emit('map', map2D);
    })

    app.use(express.static("public"));

    // io.on("connection", (socket) => {
    //   // ...
    // });

    httpServer.listen(5000);
}

main();
