import React from "react";
import "./InitialScreen.css";
import Player from "../player/Player";
import InitialScreenButton from "../initialScreenButton/InitialScreenButton";

export default function InitialScreen(props) {
    return (
        <div className="initial-container">
            <div className="initial-play-container">
                <Player photo="dog1" />
                <InitialScreenButton />
            </div>
        </div>
    );
}
