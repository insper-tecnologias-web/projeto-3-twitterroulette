import React from "react";
import AvatarPhoto from "../avatarPhoto/AvatarPhoto";
import "./AvatarPopup.css";

export default function AvatarPopup(props) {
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
    <div className="avatar-popup-overlay">
      <div className="avatar-popup-container">
        <a className="avatar-popup-close" onClick={props.togglePopup}>
          &times;
        </a>
        {photoList.map((photo, idx) => (
          <AvatarPhoto photo={photo} key={idx} changeImg={props.changeImg} />
        ))}
      </div>
    </div>
  );
}
