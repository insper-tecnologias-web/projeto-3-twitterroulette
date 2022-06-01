import React from "react";
import "./AvatarPhoto.css";

export default function AvatarPhoto(props) {
  return (
    <div className="avatar-photo-container">
      <img
        onClick={(event) => props.changeImg(props.photo)}
        className="avatar-photo-img"
        src={process.env.PUBLIC_URL + `img/animals/${props.photo}.png`}
      />
    </div>
  );
}
