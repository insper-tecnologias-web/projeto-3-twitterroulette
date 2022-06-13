import React, { useState } from "react";
import "./RoomPopup.css";
import RoomPopupButton from "../roomPopupButton/RoomPopupButton";

export default function RoomPopup(props) {
    const [roomName, setRoomName] = useState("");
    const [roomPassword, setRoomPassword] = useState("");
    return (
        <div
            className="room-popup-overlay"
            id={"room-popup-overlay-" + props.theme}
        >
            <div
                className="room-popup-container"
                id={"room-popup-container-" + props.theme}
            >
                <a
                    className="room-popup-close"
                    id={"room-popup-close-" + props.theme}
                    onClick={props.toggleRoomPopup}
                >
                    &times;
                </a>
                <h1 className="room-popup-title">Encontrar partida</h1>
                <div className="room-popup-content">
                    <div className="room-popup-inputs-container">
                        <input
                            className="room-popup-input"
                            id={"room-popup-input-" + props.theme}
                            placeholder="Nome da sala"
                            onChange={(event) =>
                                setRoomName(event.target.value)
                            }
                            value={roomName}
                        />
                        <input
                            className="room-popup-input"
                            id={"room-popup-input-" + props.theme}
                            placeholder="Senha"
                            onChange={(event) =>
                                setRoomPassword(event.target.value)
                            }
                            value={roomPassword}
                        />
                        {props.wrongPassword && <p>Senha errada</p>}
                    </div>

                    <div className="room-popup-btns-container">
                        <RoomPopupButton
                            content="CRIAR SALA"
                            theme={props.theme}
                            roomName={roomName}
                            roomPassword={roomPassword}
                            onclickfunction={props.createRoom}
                        />
                        <RoomPopupButton
                            content="IR PARA SALA"
                            theme={props.theme}
                            roomName={roomName}
                            roomPassword={roomPassword}
                            onclickfunction={props.verifyPassword}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
