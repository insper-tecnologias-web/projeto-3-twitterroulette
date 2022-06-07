import React from "react";
import "./Button.css";

export default function Button(props) {
    return (
        <div
            className="button-ext-container"
            id={"button-ext-container-" + props.theme}
        >
            <div
                className="button-container"
                id={"button-container-" + props.theme}
                onClick={props.changeRound}
            >
                <h1 className="name-button" id={"name-button-" + props.theme}>
                    Felipe Schiavinato da silva santos
                </h1>
            </div>
        </div>
    );
}
