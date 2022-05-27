import React from "react";
import "./Header.css";
import Switch from "../switch/Switch";

export default function Header(props) {
    return (
        <div
            className="header-container"
            id={"header-container-" + props.theme}
        >
            <div className="switch-container">
                <Switch toggleTheme={props.toggleTheme} />
            </div>
            <div className="title-container">
                <h1 className="header-title">Twitter Roulette</h1>
            </div>
            <div className="container-right"></div>
        </div>
    );
}
