import "./App.css";
import Tweet from "./components/tweet/Tweet";
import Header from "./components/header/Header";

function App() {
    return (
        <div className="app-container">
            <Header />
            <div className="container-topo">
                <h1 className="rodada">2/8</h1>
                <h1 className="pergunta">De quem é este tweet?</h1>
            </div>
            <Tweet className="tweet" />
        </div>
    );
}

export default App;
