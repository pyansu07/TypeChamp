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
<<<<<<< HEAD
=======
    const [chatMessages, setChatMessages] = useState([]);
>>>>>>> parent of 92b9f23 (Added multiplayer game logic and enable chat system , improved styling and made page responsive)


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
<<<<<<< HEAD
=======

      socket.on("chat_message", (chatData) => {
        setChatMessages(prevMessages => [...prevMessages, chatData]);
      });
>>>>>>> parent of 92b9f23 (Added multiplayer game logic and enable chat system , improved styling and made page responsive)
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

<<<<<<< HEAD
=======
    useEffect(() => {
      console.log('Chat messages:', chatMessages);
    }, [chatMessages]);
  const sendChatMessage = (message) => {
    if (socket && message.trim() !== '') {
      socket.emit('chat_message', message);
    }
  };


>>>>>>> parent of 92b9f23 (Added multiplayer game logic and enable chat system , improved styling and made page responsive)
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

<<<<<<< HEAD
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
=======
    const playOnlineClick = async () => {
        const result = await takePlayerName();
        if (!result.isConfirmed) {
            return;
        }

        const username = result.value;
        setPlayerName(username);
>>>>>>> parent of 92b9f23 (Added multiplayer game logic and enable chat system , improved styling and made page responsive)

        const newSocket = io("http://localhost:3000", {
            autoConnect: true,
        });

<<<<<<< HEAD
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
=======
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
        <div className="container2">
          <div className="inner-container2">
            <div className="left-panel2">
              <div className="content2">
                <h1 className="title2">TypeChamp</h1>
                <p className="subtitle2">
                  Play anonymously and safely with people for free
                </p>
              </div>
              <button className="buttons2"onClick={playOnlineClick}>
                    Login Anonymously
                  </button>
              {/* {isLoading ? (
                <div className="loading-message">Processing Login</div>
              ) : (
                <div className="buttons">

                </div>
              )} */}
            </div>
            <div className="right-panel2">
              <img
                src="https://whisper.favour.dev/landing%20page%20image.jpg"
                alt="Landing Page"
                className="image"
              />
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

                <div className='left'>You : {playerName}</div>
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
>>>>>>> parent of 92b9f23 (Added multiplayer game logic and enable chat system , improved styling and made page responsive)
            <TypingGame
                    score={score}
                    setScore={setScore}
                    isGameOver={isGameOver}
                    setIsGameOver={setIsGameOver}
                    socket={socket} 
<<<<<<< HEAD
=======
                    chatMessages={chatMessages}
                    sendChatMessage={sendChatMessage}
>>>>>>> parent of 92b9f23 (Added multiplayer game logic and enable chat system , improved styling and made page responsive)
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
