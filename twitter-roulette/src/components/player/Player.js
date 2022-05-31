import React from "react";
import "./Player.css";

export default function Player(props) {
    return (
        <div className="initial-player-container">
            <img
                className="initial-player-photo"
                src={process.env.PUBLIC_URL + `img/animals/${props.photo}.png`}
            />
            <div className="initial-player-data-container">
                <input className="initial-input-name" placeholder="Nome" />

                <input
                    className="initial-input-user"
                    placeholder="@usuáriotwitter"
                />
            </div>
        </div>
    );
}
