import React, { useState } from "react";
import "./EditPlayerPopup.css";
import Player from "../player/Player";
import AvatarPopup from "../avatarPopup/AvatarPopup";

export default function EditPlayerPopup(props) {
  const [seeAvatarPopup, setSeeAvatarPopup] = useState(false);
  const [editedImg, setEditedImg] = useState(props.user.img);
  const [editedName, setEditedName] = useState(props.user.name);
  const [editedAccount, setEditedAccount] = useState(props.user.account);

  function toggleAvatarPopup() {
    setSeeAvatarPopup((prev) => !prev);
  }

  function changeEditedImg(img) {
    setEditedImg(img);
  }

  function changeUserData() {
    props.editUser(editedImg, editedName, editedAccount);

    props.toggleEditPopup();
  }

  return (
    <>
      {seeAvatarPopup ? (
        <AvatarPopup
          toggleAvatarPopup={toggleAvatarPopup}
          changeImg={changeEditedImg}
          theme={props.theme}
          transparent={false}
        />
      ) : (
        <div className="edit-player-overlay">
          <div
            className="edit-player-container"
            id={"edit-player-container-" + props.theme}
          >
            <a
              className="edit-popup-close"
              id={"edit-popup-close-" + props.theme}
              onClick={props.toggleEditPopup}
            >
              &times;
            </a>
            <div className="edit-player-info">
              <div className="edit-imgs-container">
                <img
                  className="edit-player-photo"
                  src={process.env.PUBLIC_URL + `img/animals/${editedImg}.png`}
                />
                <div className="edit-edit-photo-container">
                  <img
                    onClick={toggleAvatarPopup}
                    className="edit-edit-photo"
                    src={process.env.PUBLIC_URL + `img/pen.png`}
                  />
                </div>
              </div>
              <div className="edit-player-data-container">
                <input
                  className="edit-input-name"
                  id={"edit-input-name-" + props.theme}
                  placeholder="Nome"
                  onChange={(event) => setEditedName(event.target.value)}
                  value={editedName}
                />

                <input
                  className="edit-input-user"
                  id={"edit-input-user-" + props.theme}
                  placeholder="@usuáriotwitter"
                  onChange={(event) => setEditedAccount(event.target.value)}
                  value={editedAccount}
                />
              </div>
            </div>
            <div className="edit-player-button" onClick={changeUserData}>
              CONFIRMAR
            </div>
          </div>
        </div>
      )}
    </>
  );
}
