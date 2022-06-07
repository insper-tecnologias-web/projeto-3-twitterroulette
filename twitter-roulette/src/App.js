import "./App.css";
import Header from "./components/header/Header";
import InitialScreen from "./components/initialScreen/InitialScreen";
import WaitingScreen from "./components/waitingScreen/WaitingScreen";
import GameScreen from "./components/gameScreen/GameScreen";
import io from "socket.io-client";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";

const socket = io.connect("http://localhost:3001");
function App() {
    const [theme, setTheme] = useState("light");
    const [gameState, setGameState] = useState("initial");
    const [user, setUser] = useState({
        id: nanoid(),
        name: "",
        account: "",
        host: false,
        img: "dog1",
        room: "",
        ready: false,
    });
    const [players, setPlayers] = useState({ [user.id]: user });
    const [hostEmit, setHostEmit] = useState(false);
    const [userEdited, setUserEdited] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);

    // console.log("players");
    // console.log(players);

    // ***** caminho do socket ******

    // apertou o botao para criar sala ou entrar em uma sala
    function joinRoom(room) {
        if (room !== "") {
            socket.emit("join_room", room);
        }
    }

    function createRoom(room, password) {
        // console.log(room, password);
        if (room !== "") {
            socket.emit("create_room", { room, password });
        }
    }

    function verifyPassword(room, password) {
        socket.emit("verify_password", { room, password });
    }

    // mudar a sala
    useEffect(() => {
        socket.on("password_verified", (data) => {
            if (data.verified) {
                setUser((prevUser) => ({
                    ...prevUser,
                    room: data.room,
                }));
                setPlayers((prevPlayers) => ({
                    ...prevPlayers,
                    [user.id]: { ...prevPlayers[user.id], room: data.room },
                }));
                joinRoom(data.room);
                setWrongPassword(false);
                setGameState("waiting-room");
            } else {
                // console.log("wrong password");
                setWrongPassword(true);
            }
        });

        socket.on("room_created", (data) => {
            // console.log("chegou aqui");
            setUser((prevUser) => ({
                ...prevUser,
                room: data.room,
                host: true,
            }));
            setPlayers((prevPlayers) => ({
                ...prevPlayers,
                [user.id]: {
                    ...prevPlayers[user.id],
                    room: data.room,
                    host: true,
                },
            }));
            setGameState("waiting-room");
        });
    }, [socket]);

    // mudou a sala manda o usuario pra sala
    useEffect(() => {
        console.log("VOU MANDAR O USER");
        console.log(user);
        socket.emit("send_user", user);
    }, [user.room, userEdited]);

    useEffect(() => {
        // se for host vai receber os usuarios e colocar no dic de players
        // console.log("socket mudou");
        socket.on("host_receive_user", (data) => {
            console.log("HOST RECEIVE USER RECEBEU");
            console.log(data);
            if (user.host) {
                console.log("SOU HOST E recebi");
                console.log(data);
                setPlayers((prevPlayers) => ({
                    ...prevPlayers,
                    [data.id]: data,
                }));
                setHostEmit((prevHostEmit) => !prevHostEmit);
            }
        });

        // se for player vai receber a lista de usuarios e colocar no dic de players
        // !!!(obs ultimo passo)!!!
        socket.on("players_receive_user_list", (data) => {
            if (!user.host) {
                setPlayers(data);
            }
        });
    }, [socket, user.host]);

    // se mudou o tamanho do dic de players e for host
    // vai mandar o dic de players para todos
    useEffect(() => {
        if (user.host) {
            console.log("SOU HOST E VOU MANDAR:");
            console.log(players);
            socket.emit("host_send_user_list", {
                players: players,
                room: user.room,
            });
        }
    }, [hostEmit, user.host]);

    console.log("User edited: " + userEdited);
    console.log("user");
    console.log(user);
    console.log(`player.length: ${Object.keys(players).length}`);

    function changeName(name) {
        // console.log("nome que chegou: " + name);
        setUser({ ...user, name: name });
        setPlayers((prevPlayers) => ({
            ...prevPlayers,
            [user.id]: { ...user, name: name },
        }));
    }

    function changeImg(img) {
        // console.log("img que chegou: " + img);
        setUser({ ...user, img: img });
        setPlayers((prevPlayers) => ({
            ...prevPlayers,
            [user.id]: { ...user, img: img },
        }));
    }

    function changeAccount(account) {
        setUser({ ...user, account: account });
        setPlayers((prevPlayers) => ({
            ...prevPlayers,
            [user.id]: { ...user, account: account },
        }));
    }

    function editUser(img, name, account) {
        setUser({ ...user, name: name, img: img, account: account });
        setPlayers((prevPlayers) => ({
            ...prevPlayers,
            [user.id]: { ...user, name: name, img: img, account: account },
        }));
        if (user.host) {
            setHostEmit((prevHostEmit) => !prevHostEmit);
        } else {
            setUserEdited((prevUserEdited) => !prevUserEdited);
        }
    }

    function toggleTheme() {
        setTheme(theme === "light" ? "dark" : "light");
    }

    let componentContent = null;
    if (gameState === "initial") {
        componentContent = (
            <InitialScreen
                theme={theme}
                user={user}
                changeName={changeName}
                changeImg={changeImg}
                changeAccount={changeAccount}
                wrongPassword={wrongPassword}
                createRoom={createRoom}
                verifyPassword={verifyPassword}
            />
        );
    } else if (gameState === "waiting-room") {
        componentContent = (
            <WaitingScreen
                theme={theme}
                players={players}
                user={user}
                socket={socket}
                editUser={editUser}
            />
        );
    } else if (gameState === "game-screen") {
        componentContent = <GameScreen theme={theme} />;
    }

    return (
        <div className="app-container" id={"app-container-" + theme}>
            <Header theme={theme} toggleTheme={toggleTheme} />
            {componentContent}
        </div>
    );
}

export default App;
