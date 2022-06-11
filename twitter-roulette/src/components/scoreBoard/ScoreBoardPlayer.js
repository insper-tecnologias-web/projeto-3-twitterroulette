import React from "react";
import "./ScoreBoardPlayer.css";

export default function ScoreBoardPlayer(props) {
    return (
        <div className="player-container">
            <div className="player-container-info">
                <img
                    className="img-player"
                    src={
                        process.env.PUBLIC_URL + `img/animals/${props.foto}.png`
                    }
                />

                <h1 className="name-player" id={"name-player-" + props.theme}>
                    {props.name}
                </h1>
                <p className="player-account">{props.account}</p>
            </div>
            <div>{props.pts}</div>
        </div>
    );
}
