import React from "react";
import "./ScoreBoard.css";
import ScoreBoardUser from "../scoreBoardUser/ScoreBoardUser";
import ScoreBoardPlayer from "../scoreBoardPlayer/ScoreBoardPlayer";

export default function ScoreBoard(props) {
    const playersComponents = Object.keys(props.players).map((playerId) => {
        const img = props.players[playerId].img;
        const name = props.players[playerId].name;
        const account = props.players[playerId].account;
        const points = props.players[playerId].points;
        return (
            <ScoreBoardPlayer
                key={playerId}
                theme={props.theme}
                foto={img}
                name={name}
                account={account}
                points={points}
            />
        );
    });
    return (
        <>
            <h1
                className="score-board-answer"
                id={`score-board-answer-${props.theme}`}
            >
                A resposta era
            </h1>
            <ScoreBoardUser theme={props.theme} game={props.game} />
            <div
                className="score-board-container"
                id={`score-board-container-${props.theme}`}
            >
                <div className="score-board-title-container">
                    <h2
                        className="score-board-title"
                        id={`score-board-title-${props.theme}`}
                    >
                        Pontuação
                    </h2>
                </div>

                {playersComponents}
            </div>
        </>
    );
}
