const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const rooms = {};

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("create_room", (data) => {
        console.log(`Creating room ${data.room}`);
        rooms[data.room] = data.password;
        socket.join(data.room);
        // console.log(rooms);
        // console.log(socket.id);
        io.to(socket.id).emit("room_created", {
            room: data.room,
        });
    });

    socket.on("verify_password", (data) => {
        console.log("data");
        console.log(data);
        console.log("rooms");
        console.log(rooms);
        if (rooms[data.room] && rooms[data.room] === data.password) {
            console.log("password is correct");
            io.to(socket.id).emit("password_verified", {
                verified: true,
                room: data.room,
            });
        } else {
            console.log("password is wrong");
            io.to(socket.id).emit("password_verified", {
                verified: false,
                room: data.room,
            });
        }
    });

    socket.on("join_room", (data) => {
        console.log(`chamou join room ${data}`);
        socket.join(data);
    });

    socket.on("send_user", (data) => {
        console.log("send user");
        console.log(data);
        if (data.room !== "") {
            console.log("entrou no if");
            socket.to(data.room).emit("host_receive_user", data);
        }
    });

    socket.on("host_send_user_list", (data) => {
        console.log("host_send_user_list");
        console.log(data);
        socket.to(data.room).emit("players_receive_user_list", data.players);
    });

    socket.on("send_message", (data) => {
        socket.to(data.message.user.room).emit("receive_message", data);
    });

    socket.on("game_init", (data) => {
        socket.to(data.room).emit("game_start", data);
    });

    socket.on("user_answered", (data) => {
        socket.to(data.room).emit("receive_user_answer", data);
    });

    socket.on("change_round", (data) => {
        socket.to(data.room).emit("receive_round_change", data);
    });

    socket.on("game_over", (data) => {
        socket.to(data.room).emit("receive_game_over", data);
    });
});

server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
});
