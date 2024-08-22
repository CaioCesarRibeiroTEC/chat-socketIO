const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app)
const io = socketIo(server);

const users = []

io.on('connection', (socket) => {


    socket.on("disconnect", () => {
        
    });

    socket.on("join",(name) => {
        const user = {id: socket.id, name}
        users.push(user);
        io.emit("users", users)

        //io.emit("message", {name: null, message: `${name} entrou no chat`});
    });

    socket.on("message", (message) => {
        message.userID = socket.id;
        io.emit("message", message);
    })

    socket.on("joinRoom", (room) => {
        socket.join(room)
    })
})
const port = process.env.PORT || 4000;

server.listen(port, () => console.log(`Servido rodando na porta ${port}`));


