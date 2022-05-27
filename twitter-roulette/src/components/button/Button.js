import React from "react";
import "./Button.css";

export default function Button(props) {
    return (
        <div
            className="button-container"
            id={"button-container-" + props.theme}
        >
            <img
                className="img-btn"
                src="https://pbs.twimg.com/profile_images/1439967563627352067/8uDh41JK_normal.jpg"
            />
            <h1 className="name" id={"name-" + props.theme}>
                Felipe Schiavinato
            </h1>
        </div>
    );
}
