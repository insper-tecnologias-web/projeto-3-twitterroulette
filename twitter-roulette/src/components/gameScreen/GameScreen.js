import "./GameScreen.css";
import Tweet from "../tweet/Tweet";
import Button from "../button/Button";

export default function GameScreen(props) {
  
    return (
        <div className="game-screen-container">
            <div className="container-top">
                <h1 className="round" id={"round-" + props.theme}>
                    2/8
                </h1>
                <h1 className="question" id={"question-" + props.theme}>
                    De quem é este tweet?
                </h1>
            </div>
            <Tweet className="tweet" theme={props.theme} />

            <div className="buttons-container">
                <Button theme={props.theme} />
                <Button theme={props.theme} />
                <Button theme={props.theme} />
                <Button theme={props.theme} />
            </div>
        </div>
    );
}

