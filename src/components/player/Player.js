import React from "react";
import "./Player.css";

export default function Player(props) {
  // console.log("usuario que chegou no player");
  // console.log(props.user);
  return (
    <div className="initial-player-container">
      <div className="initial-imgs-container">
        <img
          className="initial-player-photo"
          src={process.env.PUBLIC_URL + `img/animals/${props.user.img}.png`}
        />
        <div className="initial-edit-photo-container">
          <img
            onClick={props.toggleAvatarPopup}
            className="initial-edit-photo"
            src={process.env.PUBLIC_URL + `img/pen.png`}
          />
        </div>
      </div>
      <div className="initial-player-data-container">
        <input
          className="initial-input-name"
          id={"initial-input-name-" + props.theme}
          placeholder="Nome"
          onChange={(event) => props.changeName(event.target.value)}
          value={props.user.name}
        />

        <input
          className="initial-input-user"
          id={"initial-input-user-" + props.theme}
          placeholder="@usuáriotwitter"
          onChange={(event) => props.changeAccount(event.target.value)}
          value={props.user.account}
        />
      </div>
    </div>
  );
}
