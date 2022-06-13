import React from "react";
import "./Switch.css";

export default function Switch(props) {
    return (
        <label className="switch">
            <input type="checkbox" onClick={props.toggleTheme} />
            <span className="slider round"></span>
        </label>
    );
}
