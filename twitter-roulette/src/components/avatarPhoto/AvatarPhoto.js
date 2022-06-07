import React from "react";
import "./AvatarPhoto.css";

export default function AvatarPhoto(props) {
    return (
        <div className="avatar-photo-container">
            <img
                onClick={() => {
                    props.changeImg(props.photo);
                    props.toggleAvatarPopup();
                }}
                className="avatar-photo-img"
                src={process.env.PUBLIC_URL + `img/animals/${props.photo}.png`}
            />
        </div>
    );
}
