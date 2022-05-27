import "./App.css";
import Tweet from "./components/tweet/Tweet";
import Header from "./components/header/Header";
import Button from "./components/button/Button";
import { useState } from "react";

function App() {
    const [theme, setTheme] = useState("light");

    function toggleTheme() {
        setTheme(theme === "light" ? "dark" : "light");
    }

    console.log(`Theme: ${theme}`);
    return (
        <div className="app-container" id={"app-container-" + theme}>
            <Header theme={theme} toggleTheme={toggleTheme} />
            <div className="container-top">
                <h1 className="round" id={"round-" + theme}>
                    2/8
                </h1>
                <h1 className="question" id={"question-" + theme}>
                    De quem é este tweet?
                </h1>
            </div>
            <Tweet className="tweet" theme={theme} />

            <div className="btn-container">
                <Button theme={theme} />
                <Button theme={theme} />
                <Button theme={theme} />
                <Button theme={theme} />
            </div>
        </div>
    );
}

export default App;
