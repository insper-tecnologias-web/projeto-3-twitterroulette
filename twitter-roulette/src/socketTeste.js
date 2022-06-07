// import logo from "./logo.svg";
// import "./App.css";
// import io from "socket.io-client";
// import { useEffect, useState } from "react";

// const socket = io.connect("http://localhost:3001");
// function App() {
//     const [message, setMessage] = useState("");
//     const [messageReceived, setMessageReceived] = useState("");
//     const [room, setroom] = useState("");

//     const sendMessage = () => {
//         socket.emit("send_message", { message, room });
//     };
//     const joinroom = () => {
//         if (room !== "") {
//             socket.emit("join_room", room);
//         }
//     };
//     useEffect(() => {
//         socket.on("receive_message", (data) => {
//             setMessageReceived(data.message);
//         });
//     }, [socket]);
//     return (
//         <div className="App">
//             <input
//                 placeholder=" Room number..."
//                 onChange={(event) => {
//                     setroom(event.target.value);
//                 }}
//             ></input>
//             <button onClick={joinroom}> Join room</button>
//             <input
//                 placeholder="Message..."
//                 onChange={(event) => {
//                     setMessage(event.target.value);
//                 }}
//             />
//             <button onClick={sendMessage}> Send Message</button>
//             <h1>Message:</h1>
//             {messageReceived}
//         </div>
//     );
// }

// export default App;
