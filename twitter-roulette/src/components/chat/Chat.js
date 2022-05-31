import React, {useEffect, useState} from "react"
import io from "socket.io-client";
import { nanoid } from "nanoid";
import "./Chat.css"
import Message from "../message/Message";

const socket = io.connect("http://localhost:3001");
export default function Chat(props){
    const [currentMessage, setCurrentMessage] = useState("");
    const [allMessages, setAllMessages] = useState(null);

    console.log('All messages:')
    console.log(allMessages)

    const sendMessage = () => {
        const msgId = nanoid()
        const objMsg = {user: socket.id, content: currentMessage}
        setAllMessages(prevMessages => ({
            ...prevMessages,
            [msgId]: objMsg
        }))
        socket.emit("send_message", {id:msgId, message:objMsg});
        setCurrentMessage("");
    };
    
    
    useEffect(() => {
        console.log("Conectou")
        socket.on("receive_message", (data) => {
            setAllMessages(prevMessages => ({
                    ...prevMessages,
                [data.id] : {user: data.message.user, content: data.message.content}
            }))
        });
    }, [socket]);

    return (
        <>
            <div className="container-msgs" id={"container-msgs-"+props.theme}>
                {allMessages && Object.keys(allMessages).slice(0).reverse().map((msgKey,index) => (
                    // <h1 key={index}> {allMessages[msgKey].content} </h1>
                    <Message 
                        username={"Paulo"} 
                        message={allMessages[msgKey].content} 
                        isMyMessage={allMessages[msgKey].user === socket.id}
                    />
                ))}
            </div>
            <div className="container-input">
                <input
                    placeholder="Message..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    value={currentMessage}

                />
                <button onClick={sendMessage}>Send Message</button>
            </div>
            
        </>
        
    )
}