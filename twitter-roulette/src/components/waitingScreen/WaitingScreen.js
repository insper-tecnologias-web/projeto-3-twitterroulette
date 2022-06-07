import { useState } from "react";
import "./WaitingScreen.css";
import EditPlayerPopup from "../editPlayerPopup/EditPlayerPopup";
import WaitingScreenPlayer from "../waitingScreenPlayer/WaitingScreenPlayer";
import WaitingScreenButton from "../waitingScreenButton/WaitingScreenButton";
import Chat from "../chat/Chat";

export default function WaitingScreen(props) {
    const [ready, setReady] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const numberOfPlayers = Object.keys(props.players).length;
    const playersComponents = Object.keys(props.players).map((playerId) => {
        const img = props.players[playerId].img;
        const name = props.players[playerId].name;
        const account = props.players[playerId].account;
        const host = props.players[playerId].host;
        return (
            <div className="outer-player-container" key={playerId}>
                <hr className="line" id={"line-" + props.theme} />
                <WaitingScreenPlayer
                    theme={props.theme}
                    foto={img}
                    name={name}
                    account={account}
                    host={host}
                    ready={ready}
                />
            </div>
        );
    });

    function readyToPlay() {
        setReady((prevReady) => !prevReady);
    }

    function toggleEditPopup() {
        setEditPopup((prevEditPopup) => !prevEditPopup);
    }

    return (
        <div
            className="waiting-container"
            id={"waiting-container-" + props.theme}
        >
            {editPopup && (
                <EditPlayerPopup
                    theme={props.theme}
                    user={props.user}
                    toggleEditPlayerPopup={toggleEditPopup}
                    editUser={props.editUser}
                />
            )}
            <div
                className="waiting-container-players"
                id={"waiting-container-players-" + props.theme}
            >
                <p className="number-of-players">{numberOfPlayers}/8</p>
                {playersComponents}
            </div>
            <div className="waiting-container-right">
                <div
                    className="waiting-container-options"
                    id={"waiting-container-options-" + props.theme}
                >
                    <WaitingScreenButton
                        theme={props.theme}
                        conteudo={"EDITAR"}
                        img="user"
                        click={toggleEditPopup}
                    />
                    <WaitingScreenButton
                        theme={props.theme}
                        conteudo={props.user.host ? "JOGAR" : "PRONTO"}
                        img={props.user.host ? "play" : "verifica"}
                        click={readyToPlay}
                    />
                </div>

                <div
                    className="waiting-container-chat"
                    id={"waiting-container-chat-" + props.theme}
                >
                    <Chat
                        theme={props.theme}
                        user={props.user}
                        socket={props.socket}
                    />
                </div>
            </div>
        </div>
    );
}
