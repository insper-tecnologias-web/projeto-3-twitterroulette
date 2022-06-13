import React from "react";
import "./ScoreBoardUser.css";

export default function ScoreBoardUser(props) {
    const { usuario: user } = props.game;
    const {
        nome_usuario: userName,
        img_usuario: userImg,
        conta_usuario: userAccount,
        descricao_usuario: userDescription,
    } = user;

    return (
        <div
            className="score-board-user-container"
            id={`score-board-user-container-${props.theme}`}
        >
            <img
                className="score-board-user-img"
                id={`score-board-user-img-${props.theme}`}
                src={userImg}
            />
            <div className="score-board-user-content">
                <h1
                    className="score-board-user-name"
                    id={`score-board-user-name-${props.theme}`}
                >
                    {userName}
                </h1>
                <h2
                    className="score-board-user-account"
                    id={`score-board-user-account-${props.theme}`}
                >{`@${userAccount}`}</h2>
                <p
                    className="score-board-user-description"
                    id={`score-board-user-description-${props.theme}`}
                >
                    {`${userDescription.slice(0, 35)}${
                        userDescription.length > 35 ? "..." : ""
                    }`}
                </p>
            </div>
        </div>
    );
}
