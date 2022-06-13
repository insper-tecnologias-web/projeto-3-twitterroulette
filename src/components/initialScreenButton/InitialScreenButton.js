import React from "react";
import "./InitialScreenButton.css";

export default function InitialScreenButton(props) {
    return (
        <div
            className="initial-button-container"
            id={"initial-button-container-" + props.theme}
            onClick={props.toggleRoomPopup}
        >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <p
                className="initial-button-content"
                id={"initial-button-content-" + props.theme}
            >
                JOGAR
            </p>
        </div>
    );
}
