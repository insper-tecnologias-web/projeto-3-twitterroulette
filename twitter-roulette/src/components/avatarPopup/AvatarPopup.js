import React from "react";
import AvatarPhoto from "../avatarPhoto/AvatarPhoto";
import "./AvatarPopup.css";

export default function AvatarPopup(props) {
    let styles = {
        backgroundColor: props.transparent ? "transparent" : "white",
    };

    const photoList = [
        "bear",
        "cat1",
        "cat2",
        "chicken",
        "deer1",
        "deer2",
        "dog1",
        "dog2",
        "dog3",
        "ferret",
        "fox",
        "giraffe",
        "hen",
        "koala",
        "llama",
        "ostrich",
        "owl",
        "panda",
        "penguin",
        "puffer-fish",
        "rabbit1",
        "rabbit2",
        "rhino",
        "sloth",
        "weasel1",
        "weasel2",
    ];

    return (
        <div
            className="avatar-popup-overlay"
            id={"avatar-popup-overlay-" + props.theme}
        >
            <div
                className="avatar-popup-container"
                id={"avatar-popup-container-" + props.theme}
                style={styles}
            >
                <a
                    className="avatar-popup-close"
                    id={"avatar-popup-close-" + props.theme}
                    onClick={props.toggleAvatarPopup}
                >
                    &times;
                </a>
                {photoList.map((photo, idx) => (
                    <AvatarPhoto
                        photo={photo}
                        key={idx}
                        changeImg={props.changeImg}
                        toggleAvatarPopup={props.toggleAvatarPopup}
                    />
                ))}
            </div>
        </div>
    );
}
