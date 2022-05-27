import React from "react";
import "./WaitingScreenPlayer.css";

export default function WaitingScreenPlayer(props) {
    return (
        <div
            className="player-container"
            id={"player-container-" + props.theme}
        >
            <img className="img-player" src={process.env.PUBLIC_URL + `img/animals/${props.foto}.png`}/>

            <h1 className="name-player" id={"name-player-" + props.theme}>
                Felipe Schiavinato da silva santos
            </h1>
    
        </div>
    );
}
