import { useState, useEffect } from "react";
import "./GameScreen.css";
import Tweet from "../tweet/Tweet";
import Button from "../button/Button";
import ScoreBoard from "../scoreBoard/ScoreBoard";

export default function GameScreen(props) {
    const [buttons, setButtons] = useState([]);
    const [canPlay, setCanPlay] = useState(true);

    const whoTweeted = [
        props.game.usuario.nome_usuario,
        `@${props.game.usuario.conta_usuario}`,
    ];

    function buildButtons() {
        let playersList = Object.keys(props.players).map((key) => {
            return [props.players[key].name, props.players[key].account];
        });

        let sortedListButtons;
        if (playersList.length < 5) {
            sortedListButtons = playersList;
        } else {
            sortedListButtons = [whoTweeted];
            // random playersList

            playersList = playersList.sort(() => Math.random() - 0.5);

            for (
                let i = 0;
                sortedListButtons.length < 4 && i < playersList.length;
                i++
            ) {
                if (playersList[i][1] != whoTweeted[1]) {
                    sortedListButtons.push(playersList[i]);
                }
            }
        }
        return sortedListButtons.sort(() => Math.random() - 0.5);
    }

    useEffect(() => {
        setButtons(buildButtons());
    }, []);

    function toggleCanPlay() {
        setCanPlay(false);
    }

    useEffect(() => {
        if (props.scoreBoard) {
            const timeout = setTimeout(() => {
                props.nextRound();
            }, 5000);

            return () => clearTimeout(timeout);
        }
    }, [props.scoreBoard]);

    // console.log(`scoreBoard: ${props.scoreBoard}`);
    // console.log(`game:`);
    // console.log(props.game);

    if (props.scoreBoard) {
        return (
            <div className="game-screen-container">
                <ScoreBoard
                    theme={props.theme}
                    game={props.game}
                    players={props.players}
                />
            </div>
        );
    } else {
        return (
            <div className="game-screen-container">
                <div className="container-top">
                    <h1 className="round" id={"round-" + props.theme}>
                        {props.round + 1}/10
                    </h1>
                    <h1 className="question" id={"question-" + props.theme}>
                        {props.game.retweet
                            ? "Quem retweetou isso?"
                            : "De quem é este tweet?"}
                    </h1>
                </div>
                <Tweet
                    className="tweet"
                    theme={props.theme}
                    game={props.game}
                    canBlur={true}
                />

                <div className="buttons-container">
                    {buttons.map((player, idx) => {
                        return (
                            <Button
                                key={idx}
                                theme={props.theme}
                                changeRound={props.changeRound}
                                player={player}
                                submitAnswer={props.submitAnswer}
                                rightAnswer={whoTweeted[1]}
                                canPlay={canPlay}
                                toggleCanPlay={toggleCanPlay}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }

    // function timeSleep(milliseconds) {
    //     var start = new Date().getTime();
    //     for (var i = 0; i < 1e7; i++) {
    //         if (new Date().getTime() - start > milliseconds) {
    //             break;
    //         }
    //     }
    // }

    // if (props.scoreBoard) {
    //     setSleep(true);
    //     props.disableCoreBoard();
    // }

    // if (sleep) {
    //     timeSleep(1000);
    //     setSleep(false);
    // }

    return (
        <div className="game-screen-container">
            {props.scoreBoard ? (
                <ScoreBoard
                    theme={props.theme}
                    game={props.game}
                    players={props.players}
                />
            ) : (
                <>
                    <div className="container-top">
                        <h1 className="round" id={"round-" + props.theme}>
                            {props.round + 1}/10
                        </h1>
                        <h1 className="question" id={"question-" + props.theme}>
                            {props.game.retweet
                                ? "Quem retweetou isso?"
                                : "De quem é este tweet?"}
                        </h1>
                    </div>
                    <Tweet
                        className="tweet"
                        theme={props.theme}
                        game={props.game}
                        canBlur={true}
                    />

                    <div className="buttons-container">
                        {buttons.map((player, idx) => {
                            return (
                                <Button
                                    key={idx}
                                    theme={props.theme}
                                    changeRound={props.changeRound}
                                    player={player}
                                    submitAnswer={props.submitAnswer}
                                    rightAnswer={whoTweeted[1]}
                                    canPlay={canPlay}
                                    toggleCanPlay={toggleCanPlay}
                                />
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}
