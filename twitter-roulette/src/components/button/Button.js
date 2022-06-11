import React from "react";
import "./Button.css";

export default function Button(props) {
    const [isSelected, setIsSelected] = React.useState("unselected");
    // console.log(`buttonType: ${isSelected} do player ${props.player[0]}`);
    return (
        <div
            className="button-ext-container"
            id={"button-ext-container-" + props.theme}
        >
            <div
                className="button-container"
                id={`button-container-${isSelected}-${props.theme}`}
                onClick={() => {
                    if (props.canPlay) {
                        setIsSelected("selected");
                        props.toggleCanPlay();
                        if (props.rightAnswer === props.player[1]) {
                            props.submitAnswer(true);
                        } else {
                            props.submitAnswer(false);
                        }
                    }
                }}
            >
                <h1 className="name-button" id={"name-button-" + props.theme}>
                    {`${props.player[0]} (${props.player[1]})`}
                </h1>
            </div>
        </div>
    );
}
