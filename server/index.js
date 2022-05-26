const express =require('express');
const app = express();
const http = require("http");
const {Server} = require("socket.io");
const cors = require("cors")

app.use(cors())

const server = http.createServer(app);

const io = new Server(server, {
  cors:{
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
  }
})

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`)
  socket.on("join_room",(data)=>{
    socket.join(data);
  });
  socket.on("send_message",(data)=>{
    socket.to(data.room).emit("receive_message",data);
  });
  
});

server.listen(3001, () => {
    console.log("SERVER IS RUNNING")
})


// const app = require('express')();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
// const port = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', (socket) => {
//   socket.on('chat message', msg => {
//     io.emit('chat message', msg);
//   });
// });

// http.listen(port, () => {
//   console.log(`Socket.IO server running at http://localhost:${port}/`);
// });
