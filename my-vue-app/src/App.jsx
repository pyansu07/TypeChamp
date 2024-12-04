import React, { useState, useEffect } from 'react';
import TypingGame from './components/TypingGame';
import './App.css';
import io from 'socket.io-client';
import Swal from 'sweetalert2';
import ChatBox from './components/ChatBox';

const App = () => {
    const [socket, setSocket] = useState(null);
    const [playerName, setPlayerName] = useState("");
    const [gameState, setGameState] = useState('login');
    const [players, setPlayers] = useState({
        count: 0,
        required: 4,
        list: []
    });
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [finishedArrayState, setFinishedArrayState] = useState([]);
    const [winnerName, setWinnerName] = useState("");


    socket?.on("connect", function () {
        setPlayOnline(true);
    });

    socket?.on("OpponentNotFound", function () {
        setOpponentName(false);
    });

    socket?.on("OpponentFound", function (data) {
        setOpponentName(data.opponentName);
    });

    // socket?.on("opponent_score_update", function (score) {
    //     setOpponentScore(score);
    // });

    socket?.on("opponent_score_update", (score) => {
      setOpponentScore(score);
    });

    // socket?.on("announce_winner", (winner) => {
    //   setWinnerName(winner);
    // });

  //  const checkWinner = () => {
  //     if (score > opponentScore) {
  //         setWinnerName(playerName);
  //     } else if (score < opponentScore) {
  //         setWinnerName(opponentName);
  //     } else {
  //         setWinnerName("It's a Tie!");
  //     }
  // };

  useEffect(() => {
    if (socket) {
      socket.on("opponent_score_update", (score) => {
        setOpponentScore(score);
      });

      socket.on("announce_winner", (winner) => {
        setWinnerName(winner);
      });
    }
  }, [socket]);
    // useEffect(() => {
    //     if (isGameOver) {
    //         checkWinner();
    //     }
    // }, [isGameOver]);
    const checkWinner = () => {
      if (score > opponentScore) {
          setWinnerName(playerName);
      } else if (score < opponentScore) {
          setWinnerName(opponentName);
      } else {
          setWinnerName("It's a Tie!");
      }
  };

  useEffect(() => {
      if (isGameOver) {
          checkWinner();
      }
  }, [isGameOver]);
    // useEffect(() => {
    //   const winner = checkWinner();
    //   if (winner) {
    //     setFinishetState(winner);
    //   }
    // }, [gameState]);

    useEffect(() => {
      if (isGameOver && socket) {
        socket.emit("game_over");
       // socket.emit("score_update");
       // socket.emit("announce_winner");
      }
    }, [isGameOver, socket]);

    const takePlayerName = async () => {
        const result = await Swal.fire({
            title: "Enter your name",
            input: "text",
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "You need to write something!";
                }
            },
        });

        if (result.isConfirmed) {
            const username = result.value;
            setPlayerName(username);

            const newSocket = io("http://localhost:3000");
            newSocket.on("connect", () => {
                console.log("Connected to server!");
                newSocket.emit("request_to_play", {
                    playerName: username
                });
            });

            setSocket(newSocket);
        }
    };

    // if(isGameOver){
    //   socket.on("score_update", (score) => {
    //     setOpponentScore(score);
    //   });
    // }



    if (!playOnline) {
        return (
            <div className="main-div">
                <button onClick={playOnlineClick} className="playOnline">
                    Play Online
                </button>
            </div>
          </div>
        </div>
        </div>
      )
      
      
      
      
      // return (
        //     <div className="main-div">
        //         <button onClick={playOnlineClick} className="playOnline">
        //             Play Online
        //         </button>
        //     </div>
        // );
    }

    // Render login screen
    if (gameState === 'login') {
        return (
            <div className="login-container">
                <div className="login-card">
                    <div className="login-content">
                        <h1 className="login-title">TypeChamp</h1>
                        <p className="login-subtitle">
                            Compete with 3 other players in this typing challenge!
                        </p>
                        <button className="login-button" onClick={playOnlineClick}>
                            Login to Play
                        </button>
                    </div>
                    <div className="login-image">
                        <img
                            src="https://whisper.favour.dev/landing%20page%20image.jpg"
                            alt="Landing Page"
                        />
                    </div>
                </div>
            </div>
        );
    }

    // Render game screen
    return (
        <>
            <div className="move-detection">
                <div className='left'>{playerName}</div>
                <div className='right'>  {opponentName}</div>
                        {/* <div
          className={`left ${
            currentPlayer === playingAs ? "current-move-" + currentPlayer : ""
          }`}
        >
          {playerName}
        </div>
        <div
          className={`right ${
            currentPlayer !== playingAs ? "current-move-" + currentPlayer : ""
          }`}
        >
          {opponentName}
        </div> */}
            </div>
            <TypingGame
                    score={score}
                    setScore={setScore}
                    isGameOver={isGameOver}
                    setIsGameOver={setIsGameOver}
                    socket={socket} 
                />                {isGameOver && winnerName && (
                    <div className="winner-announcement">
                        <h2>Winner: {winnerName}</h2>
                    </div>
                )}
            </div>
        </>
    );
};

export default App;