import { useState, useEffect } from "react";
import "./GameScreen.css";
import Tweet from "../tweet/Tweet";
import TweetDebug from "../tweet/TweetDebug";
import Button from "../button/Button";

export default function GameScreen(props) {
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
                // console.log(
                //     `tamanho de sortedListButtons ${sortedListButtons.length}`
                // );
                // console.log(`playersList esta em ${playersList[i][1]}`);
                // console.log(`whoTweeted: ${whoTweeted[1]}`);
                if (playersList[i][1] != whoTweeted[1]) {
                    sortedListButtons.push(playersList[i]);
                }
            }
        }
        return sortedListButtons.sort(() => Math.random() - 0.5);
    }

    const [buttons, setButtons] = useState([]);

    useEffect(() => {
        setButtons(buildButtons());
    }, []);

    const [canPlay, setCanPlay] = useState(true);

    function toggleCanPlay() {
        setCanPlay(false);
    }

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
            <TweetDebug
                className="tweet"
                theme={props.theme}
                game={props.game}
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
