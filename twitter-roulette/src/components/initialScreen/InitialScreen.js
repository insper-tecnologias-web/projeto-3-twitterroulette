import React, { useState } from "react";
import "./InitialScreen.css";
import Player from "../player/Player";
import AvatarPopup from "../avatarPopup/AvatarPopup";
import RoomPopup from "../roomPopup/RoomPopup";
import InitialScreenButton from "../initialScreenButton/InitialScreenButton";

export default function InitialScreen(props) {
    const [seeAvatarPopup, setSeeAvatarPopup] = useState(false);
    const [seeRoomPopup, setSeeRoomPopup] = useState(false);

    function toggleAvatarPopup() {
        setSeeAvatarPopup((prev) => !prev);
    }

    function toggleRoomPopup() {
        setSeeRoomPopup((prev) => !prev);
    }

    let componentContent = null;
    if (seeAvatarPopup) {
        componentContent = (
            <AvatarPopup
                toggleAvatarPopup={toggleAvatarPopup}
                changeImg={props.changeImg}
                theme={props.theme}
                transparent={true}
            />
        );
    } else if (seeRoomPopup) {
        componentContent = (
            <RoomPopup
                theme={props.theme}
                toggleRoomPopup={toggleRoomPopup}
                wrongPassword={props.wrongPassword}
                createRoom={props.createRoom}
                verifyPassword={props.verifyPassword}
            />
        );
    } else {
        componentContent = (
            <div className="initial-play-container">
                <Player
                    theme={props.theme}
                    user={props.user}
                    toggleAvatarPopup={toggleAvatarPopup}
                    changeName={props.changeName}
                    changeAccount={props.changeAccount}
                />
                <InitialScreenButton
                    theme={props.theme}
                    toggleRoomPopup={toggleRoomPopup}
                />
            </div>
        );
    }

    return (
        <div
            className="initial-container"
            id={"initial-container-" + props.theme}
        >
            {/* {seeAvatarPopup ? (
                <AvatarPopup
                    toggleAvatarPopup={toggleAvatarPopup}
                    changeImg={props.changeImg}
                    theme={props.theme}
                />
            ) : (
                <div className="initial-play-container">
                    <Player
                        user={props.user}
                        toggleAvatarPopup={toggleAvatarPopup}
                        changeName={props.changeName}
                        changeAccount={props.changeAccount}
                    />
                    <InitialScreenButton
                        theme={props.theme}
                        toggleRoomPopup={toggleRoomPopup}
                    />
                </div>
            )} */}
            {componentContent && componentContent}
        </div>
    );
}
