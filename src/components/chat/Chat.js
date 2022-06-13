import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";
import "./Chat.css";
import Message from "../message/Message";

// const socket = io.connect("http://localhost:3001");
export default function Chat(props) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [allMessages, setAllMessages] = useState(null);

  const sendMessage = () => {
    const msgId = nanoid();
    const objMsg = { user: props.user, content: currentMessage };
    setAllMessages((prevMessages) => ({
      ...prevMessages,
      [msgId]: objMsg,
    }));
    props.socket.emit("send_message", { id: msgId, message: objMsg });
    setCurrentMessage("");
  };

  useEffect(() => {
    props.socket.on("receive_message", (data) => {
      setAllMessages((prevMessages) => ({
        ...prevMessages,
        [data.id]: {
          user: data.message.user,
          content: data.message.content,
        },
      }));
    });
  }, [props.socket]);

  function verifyClick(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  }

  return (
    <>
      <div className="container-msgs" id={"container-msgs-" + props.theme}>
        {allMessages &&
          Object.keys(allMessages)
            .slice(0)
            .reverse()
            .map((msgKey, index) => (
              <Message
                username={allMessages[msgKey].user.name}
                message={allMessages[msgKey].content}
                isMyMessage={allMessages[msgKey].user.id === props.user.id}
              />
            ))}
      </div>
      <div className="container-input">
        <input
          className="message-input"
          id={"message-input-" + props.theme}
          placeholder="Mensagem..."
          onKeyDown={(event) => {
            verifyClick(event);
          }}
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          value={currentMessage}
        />
      </div>
    </>
  );
}
