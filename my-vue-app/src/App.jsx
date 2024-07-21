import React, { useState, useEffect } from 'react';
import TypingGame from './components/TypingGame';
import './App.css';
import io from 'socket.io-client';
import Swal from 'sweetalert2';

const App = () => {
    const [playOnline, setPlayOnline] = useState(false);
    const [socket, setSocket] = useState(null);
    const [playerName, setPlayerName] = useState("");
    const [opponentName, setOpponentName] = useState(null);
    const [score, setScore] = useState(0);
    const [opponentScore, setOpponentScore] = useState(0); 
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

        return result;
    };

    const playOnlineClick = async () => {
        const result = await takePlayerName();
        if (!result.isConfirmed) {
            return;
        }

        const username = result.value;
        setPlayerName(username);

        const newSocket = io("http://localhost:3000", {
            autoConnect: true,
        });

        newSocket?.emit("request_to_play", {
            playerName: username,
        });

        newSocket?.on("score_update", (score) => {
            setOpponentScore(score);
        });

        setSocket(newSocket);
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
        );
    }

      if (playOnline && !opponentName) {
    return (
      <div className="waiting">
        <p>Waiting for opponent....</p>
      </div>
    );
  }

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
            <div className="App">
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
