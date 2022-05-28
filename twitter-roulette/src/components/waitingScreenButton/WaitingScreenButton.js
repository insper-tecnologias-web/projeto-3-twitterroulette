import React from "react";
import "./WaitingScreenButton.css";

export default function WaitingScreenButton(props) {
    return (
        // <div className="waiting-button-container">
        //         <img
        //             className="waiting-button-img"
        //             src={process.env.PUBLIC_URL + `img/${props.img}.png`}
        //         />
        //         <p className="waiting-button-text">{props.conteudo}</p>
        // </div>
        <div className="waiting-button-container">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <div className="waiting-button-conteudo">
                <img
                    className="waiting-button-img"
                    src={process.env.PUBLIC_URL + `img/${props.img}.png`}
                />
                <p className="waiting-button-text">{props.conteudo}</p>
            </div>
        </div>
    );
}
