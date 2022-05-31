import "./App.css";
import Header from "./components/header/Header";
import InitialScreen from "./components/initialScreen/InitialScreen";
import WaitingScreen from "./components/waitingScreen/WaitingScreen";
import GameScreen from "./components/gameScreen/GameScreen";

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
            <InitialScreen theme={theme} />
            {/* <GameScreen theme={theme} /> */}
            {/* <WaitingScreen theme={theme} /> */}
        </div>
    );
}

export default App;
