import React from "react";
import "./WaitingScreenPlayer.css";

export default function WaitingScreenPlayer(props) {
    // console.log("TEMA");
    // console.log(props.theme);
    // console.log("HOST");
    // console.log(props.host);
    return (
        <div
            className="player-container"
            id={"player-container-" + props.theme}
        >
            <div className="player-info-container">
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
            {props.host ? (
                <img
                    className="img-crown"
                    src={
                        process.env.PUBLIC_URL +
                        "img/crown-" +
                        props.theme +
                        "-mode.png"
                    }
                />
            ) : props.ready ? (
                <img
                    className="img-crown"
                    src={
                        process.env.PUBLIC_URL +
                        "img/marca-de-verificacao-" +
                        props.theme +
                        ".png"
                    }
                />
            ) : (
                <></>
            )}
        </div>
    );
}
