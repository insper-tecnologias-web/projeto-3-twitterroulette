import React from "react";
import "./Message.css";

export default function Message(props) {
    return (
        <div
            className={
                props.isMyMessage
                    ? "my-message-container"
                    : "other-message-container"
            }
            id={
                props.isMyMessage
                    ? "my-message-container" + props.theme
                    : "other-message-container" + props.theme
            }
        >
            <h1 className={props.isMyMessage ? "my-user" : "other-user"}>
                {props.username}
            </h1>
            <div className={props.isMyMessage ? "my-message" : "other-message"}>
                {props.message}
            </div>
        </div>
    );
}
