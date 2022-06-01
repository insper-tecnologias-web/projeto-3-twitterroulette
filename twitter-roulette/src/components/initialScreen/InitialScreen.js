import React, { useState } from "react";
import "./InitialScreen.css";
import Player from "../player/Player";
import AvatarPopup from "../avatarPopup/AvatarPopup";
import InitialScreenButton from "../initialScreenButton/InitialScreenButton";

export default function InitialScreen(props) {
  const [seePopup, setSeePopup] = useState(false);
  const [img, setImg] = useState("dog1");

  function changeImg(newImg) {
    setImg(newImg);
    togglePopup();
  }

  function togglePopup() {
    setSeePopup((prev) => !prev);
  }

  return (
    <div className="initial-container">
      {seePopup ? (
        <AvatarPopup togglePopup={togglePopup} changeImg={changeImg} />
      ) : (
        <div className="initial-play-container">
          <Player photo={img} togglePopup={togglePopup} />
          <InitialScreenButton />
        </div>
      )}
    </div>
  );
}
