import "./GameScreen.css";
import Tweet from "../tweet/Tweet";
import Button from "../button/Button";

export default function GameScreen(props) {
  console.log("game");
  console.log(props.game);
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
      <Tweet className="tweet" theme={props.theme} game={props.game} />

      <div className="buttons-container">
        {/* <Button theme={props.theme} changeRound={props.changeRound} />
                <Button theme={props.theme} changeRound={props.changeRound} />
                <Button theme={props.theme} changeRound={props.changeRound} />
                <Button theme={props.theme} changeRound={props.changeRound} /> */}
      </div>
    </div>
  );
}
