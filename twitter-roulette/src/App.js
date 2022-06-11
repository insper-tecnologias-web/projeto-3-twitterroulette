import "./App.css";
import Header from "./components/header/Header";
import InitialScreen from "./components/initialScreen/InitialScreen";
import WaitingScreen from "./components/waitingScreen/WaitingScreen";
import GameScreen from "./components/gameScreen/GameScreen";
import io from "socket.io-client";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import axios from "axios";

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
        acertos: 0,
    });
    const [nAnswers, setNAnswers] = useState(0);
    const [players, setPlayers] = useState({ [user.id]: user });
    const [sortedGame, setSortedGame] = useState([]);
    const [round, setRound] = useState(0);
    const [hostEmit, setHostEmit] = useState(false);
    const [userEdited, setUserEdited] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);

    console.log("players");
    console.log(players);

    console.log("GAME STATE");
    console.log(gameState);

    // ***** caminho do socket ******

    // apertou o botao para criar sala ou entrar em uma sala
    function joinRoom(room) {
        if (room !== "") {
            socket.emit("join_room", room);
        }
    }

    function createRoom(room, password) {
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
                setWrongPassword(true);
            }
        });

        socket.on("room_created", (data) => {
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
        socket.emit("send_user", user);
    }, [user.room, userEdited]);

    useEffect(() => {
        // se for host vai receber os usuarios e colocar no dic de players
        socket.on("host_receive_user", (data) => {
            if (user.host) {
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
            socket.emit("host_send_user_list", {
                players: players,
                room: user.room,
            });
        }
    }, [hostEmit, user.host]);

    // Host clicou em start, muda o seu estado de tela e avisa para outros jogadores mudarem
    function play() {
        const accountList = Object.values(players).map((player) =>
            player.account.slice(1)
        );

        axios
            .post("http://127.0.0.1:8000/api/criajogo/", {
                usuarios: accountList,
            })
            .then((response) => {
                const sortedGame = response.data.jogo.sort(
                    () => Math.random() - 0.5
                );
                setSortedGame(sortedGame);
            })
            .then(() => {
                setGameState("game-screen");
            });
    }

    // Quando o Host terminou de fazer o request para o backend manda o jogo para os usuarios
    useEffect(() => {
        if (sortedGame.length > 0) {
            socket.emit("game_init", { room: user.room, game: sortedGame });
        }
    }, [sortedGame.length]);

    // Host iniciou o jogo e outros user vao setar o
    // estado de tela para tela do jogo e o sorted game com o conteudo do jogo
    useEffect(() => {
        socket.on("game_start", (data) => {
            setGameState("game-screen");
            setSortedGame(data.game);
        });
    }, [socket]);

    console.log("numero de respostas " + nAnswers);
    // User e Host responderam uma rodada
    function submitAnswer(isRight) {
        setUser((prevUser) => ({
            ...prevUser,
            acertos: isRight ? prevUser.acertos + 1 : prevUser.acertos,
        }));

        if (user.host) {
            setNAnswers((prevNAnswers) => prevNAnswers + 1);
            setPlayers((prevPlayers) => ({
                ...prevPlayers,
                [user.id]: {
                    ...prevPlayers[user.id],
                    acertos: isRight
                        ? prevPlayers[user.id].acertos + 1
                        : prevPlayers[user.id].acertos,
                },
            }));
        } else {
            socket.emit("user_answered", {
                room: user.room,
                user: {
                    ...user,
                    acertos: isRight ? user.acertos + 1 : user.acertos,
                },
            });
        }
    }

    // Host recebe a resposta de um user
    useEffect(() => {
        if (user.host) {
            socket.on("receive_user_answer", (data) => {
                setNAnswers((prevNAnswers) => prevNAnswers + 1);
                setPlayers((prevPlayers) => ({
                    ...prevPlayers,
                    [data.user.id]: {
                        ...prevPlayers[data.user.id],
                        acertos: data.user.acertos,
                    },
                }));
            });
        }
    }, [socket, user.host]);

    // Host verifica se todos os usuarios responderam
    useEffect(() => {
        if (nAnswers === Object.keys(players).length && user.host) {
            if (round === 9) {
                setUser((prevUser) => ({
                    ...prevUser,
                    acertos: 0,
                    ready: false,
                }));

                let newPlayers = {};
                for (const [playerId, playerValue] of Object.entries(players)) {
                    newPlayers[playerId] = {
                        ...playerValue,
                        acertos: 0,
                        ready: false,
                    };
                }

                setPlayers(newPlayers);
                setSortedGame([]);
                setRound(0);
                setNAnswers(0);
                setGameState("waiting-room");
                console.log("GAME OVER");
                socket.emit("game_over", {
                    room: user.room,
                    players: newPlayers,
                });
            } else {
                socket.emit("change_round", {
                    room: user.room,
                    round: round + 1,
                    players: players,
                });
                setRound((prevRound) => prevRound + 1);
                setNAnswers(0);
            }
        }
    }, [nAnswers, user.host]);

    // Users recebem a mundança de rodada
    useEffect(() => {
        socket.on("receive_round_change", (data) => {
            setRound(data.round);
            setPlayers(data.players);
        });
    }, [socket]);

    // Users recebem a mundança de fim de jogo
    useEffect(() => {
        socket.on("receive_game_over", (data) => {
            setPlayers(data.players);
            setUser((prevUser) => ({
                ...prevUser,
                acertos: 0,
                ready: false,
            }));
            setSortedGame([]);
            setRound(0);
            setGameState("waiting-room");
        });
    }, [socket]);

    function changeName(name) {
        setUser({ ...user, name: name });
        setPlayers((prevPlayers) => ({
            ...prevPlayers,
            [user.id]: { ...user, name: name },
        }));
    }

    function changeImg(img) {
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

    function readyToPlay() {
        setUser({ ...user, ready: !user.ready });
        setPlayers((prevPlayers) => ({
            ...prevPlayers,
            [user.id]: { ...user, ready: !user.ready },
        }));
        setUserEdited((prevUserEdited) => !prevUserEdited);
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

    // function changeRound() {
    //     setRound((prevRound) => prevRound + 1);
    // }

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
                readyToPlay={readyToPlay}
                play={play}
                nAnswers={nAnswers}
            />
        );
    } else if (gameState === "game-screen") {
        const gameScreensList = Object.values(sortedGame).map(
            (game, gameIdx) => {
                return (
                    <GameScreen
                        key={gameIdx}
                        theme={theme}
                        game={game}
                        round={round}
                        players={players}
                        submitAnswer={submitAnswer}
                    />
                );
            }
        );
        componentContent = gameScreensList[round];
    }

    return (
        <div className="app-container" id={"app-container-" + theme}>
            <Header theme={theme} toggleTheme={toggleTheme} />
            {componentContent}
        </div>
    );
}

export default App;
