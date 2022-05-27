import "./App.css";
import GameScreen from "./components/gameScreen/GameScreen"
import Header from "./components/header/Header"

import { useState } from "react";
import WaitingScreen from "./components/waitingScreen/WaitingScreen";

function App() {
    const [theme, setTheme] = useState("light");

    function toggleTheme() {
        setTheme(theme === "light" ? "dark" : "light");
    }

    console.log(`Theme: ${theme}`);
    return (
        <div className="app-container" id={"app-container-" + theme}>
            <Header theme={theme} toggleTheme={toggleTheme} />
            {/* <GameScreen theme = {theme}/> */}
            <WaitingScreen theme = {theme}/>

        </div>
    );
}

export default App;
