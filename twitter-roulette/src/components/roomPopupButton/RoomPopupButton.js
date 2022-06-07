import React from "react";
import "./RoomPopupButton.css";

export default function RoomPopupButton(props) {
    return (
        <div
            className="room-popup-btn-container"
            id={"room-popup-btn-container-" + props.theme}
            onClick={() =>
                props.onclickfunction(props.roomName, props.roomPassword)
            }
        >
            <h1 className="room-popup-btn-content">{props.content}</h1>
        </div>
    );
}
