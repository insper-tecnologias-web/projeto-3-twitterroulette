import React from "react";
import "./ScoreBoardPlayer.css";

export default function ScoreBoardPlayer(props) {
    return (
        <div className="score-board-player-container">
            <div className="score-board-player-left-container">
                <img
                    className="score-board-player-img"
                    src={
                        process.env.PUBLIC_URL + `img/animals/${props.foto}.png`
                    }
                />

                <h1
                    className="score-board-player-name"
                    id={"name-player-" + props.theme}
                >
                    {props.name}
                </h1>
                <p className="score-board-player-account">{props.account}</p>
            </div>
            <h2 className="score-board-player-points">{props.points}</h2>
        </div>
    );
}
