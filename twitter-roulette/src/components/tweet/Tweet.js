import { TwitterTweetEmbed } from "react-twitter-embed";
import "./Tweet.css";

export default function Tweet(props) {
    return (
        <div className="tweet-container">
            <div className="tweet-header">
                <div className="container-img">
                    <img
                        className="img"
                        src="https://pbs.twimg.com/profile_images/1439967563627352067/8uDh41JK_normal.jpg"
                    />
                </div>
                <div className="nome-usuario-container">
                    <h1 className="nome">Felipe Schiavinato</h1>
                    <h2 className="usuario">@Schi4vF</h2>
                </div>
                <div className="logo-container">
                    <img src="./twitter-logo-4.png" className="logo" />
                </div>
            </div>
            <div className="conteudo-container">
                <p className="conteudo">
                    Pai fez um carbonara dos deuses hj tá &#x1f90c; 🇮🇹 🍝
                </p>
                <p className="data-horario">11:32 PM · May 19, 2022</p>
            </div>
        </div>
    );
}
