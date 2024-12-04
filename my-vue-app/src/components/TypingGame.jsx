import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
import './TypingGame.css';
=======
import './app.css';
import io from 'socket.io-client';
>>>>>>> 9d46fa049dbbe3fbb0ef59f3260f15133da6d0e7
=======
import './app.css';
import io from 'socket.io-client';
>>>>>>> parent of 92b9f23 (Added multiplayer game logic and enable chat system , improved styling and made page responsive)

const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Coding is fun and challenging at the same time.",
    "React.js is a popular JavaScript library for building user interfaces.",
    "Practice makes perfect in programming.",
    "Always strive for continuous improvement in your skills.",
    "Keep calm and code on!",
    "Programming is a creative process of problem-solving.",
    "Efficiency and readability are key factors in writing good code.",
    "Success in coding requires patience and perseverance.",
    "Learning new technologies opens up endless possibilities.",
];

<<<<<<< HEAD
<<<<<<< HEAD
const TypingGame = ({ score, setScore, socket }) => {
    const [currentSentence, setCurrentSentence] = useState('');
    const [userInput, setUserInput] = useState('');
    const [time, setTime] = useState(10);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [accuracy, setAccuracy] = useState(100);
    const [wordsPerMinute, setWordsPerMinute] = useState(0);
    const [startTime, setStartTime] = useState(null);
=======
const TypingGame = ({ score, setScore, isGameOver, setIsGameOver, socket, chatMessages, sendChatMessage }) => {
    const [sentence, setSentence] = useState('');
    const [input, setInput] = useState('');
    const [time, setTime] = useState(15);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [chatInput, setChatInput] = useState('');
>>>>>>> 9d46fa049dbbe3fbb0ef59f3260f15133da6d0e7
=======
const TypingGame = ({ score, setScore, isGameOver, setIsGameOver, socket, chatMessages, sendChatMessage }) => {
    const [sentence, setSentence] = useState('');
    const [input, setInput] = useState('');
    const [time, setTime] = useState(15);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [chatInput, setChatInput] = useState('');
>>>>>>> parent of 92b9f23 (Added multiplayer game logic and enable chat system , improved styling and made page responsive)

    useEffect(() => {
        setIsGameStarted(true);
        startGame();
    }, []);

    useEffect(() => {
        if (time > 0 && !isGameOver && isGameStarted) {
            const timer = setTimeout(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearTimeout(timer);
        } else if (time === 0 && isGameStarted) {
<<<<<<< HEAD
<<<<<<< HEAD
            if (socket) {
                socket.emit("game_over", wordsPerMinute); // Send WPM as score
=======
            setIsGameOver(true);
        }
    }, [time, isGameOver, isGameStarted]);

    const startGame = () => {
        generateRandomSentence();
        setTime(15);
        setScore(0);
        setInput('');
        setIsGameOver(false);
    };

    const generateRandomSentence = () => {
        const randomIndex = Math.floor(Math.random() * sentences.length);
        setSentence(sentences[randomIndex]);
    };

    const handleChange = (e) => {
        if (!isGameOver && isGameStarted) {
            setInput(e.target.value);
            if (e.target.value.trim() === sentence) {
                setScore((prevScore) => prevScore + 1);
                setInput('');
                generateRandomSentence();
                socket.emit("score_update", score + 1);
>>>>>>> 9d46fa049dbbe3fbb0ef59f3260f15133da6d0e7
            }
=======
            setIsGameOver(true);
>>>>>>> parent of 92b9f23 (Added multiplayer game logic and enable chat system , improved styling and made page responsive)
        }
    }, [time, isGameOver, isGameStarted]);

    const startGame = () => {
        generateRandomSentence();
        setTime(15);
        setScore(0);
        setInput('');
        setIsGameOver(false);
    };

    const generateRandomSentence = () => {
        const randomIndex = Math.floor(Math.random() * sentences.length);
        setSentence(sentences[randomIndex]);
    };

    const handleChange = (e) => {
        if (!isGameOver && isGameStarted) {
            setInput(e.target.value);
            if (e.target.value.trim() === sentence) {
                setScore((prevScore) => prevScore + 1);
                setInput('');
                generateRandomSentence();
                socket.emit("score_update", score + 1);
            }
        }
    };

    const handleChatSubmit = (e) => {
        e.preventDefault();
        if (chatInput.trim() !== '') {
            socket.emit('chat_message', chatInput);
            setChatInput('');
        }
    };

    const handleChatSubmit = (e) => {
        e.preventDefault();
        if (chatInput.trim() !== '') {
            socket.emit('chat_message', chatInput);
            setChatInput('');
        }
    };

    return (
<<<<<<< HEAD
<<<<<<< HEAD
        <div className="typing-game">
            <div className="stats-container">
                <div className="stat-card">
                    <div className="stat-icon time-icon">⏱️</div>
                    <div className="stat-label">Time</div>
                    <div className="stat-value">{time}s</div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon score-icon"></div>
                    <div className="stat-label">WPM</div>
                    <div className="stat-value">{wordsPerMinute}</div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon accuracy-icon">📊</div>
                    <div className="stat-label">Accuracy</div>
                    <div className="stat-value">{accuracy}%</div>
                </div>
=======
        <div className="container">
            <div className="game-container">
                <h1 className="title">Sentence Typing Game</h1>
                {isGameStarted && (
                    <>
                        <div className="timer">Time Left: {time}</div>
                        <p>Your Score: {score}</p>
                        <div className="sentence">{sentence}</div>
                        {!isGameOver && (
                            <div className="input-container">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="Type here..."
                                    autoFocus
                                />
                            </div>
                        )}
                        {isGameOver && (
                            <div className="game-over">
                                <p>Game Over!</p>
                                <p>Your Score: {score}</p>
                            </div>
                        )}
                    </>
                )}
>>>>>>> parent of 92b9f23 (Added multiplayer game logic and enable chat system , improved styling and made page responsive)
            </div>
            <div className="chat-container">
                <div className="chat-messages">
                    {chatMessages.map((msg, index) => (
                        <div key={index} className="chat-message">
                            <strong>{msg.sender}:</strong> {msg.message}
                        </div>
                    ))}
                </div>
                <form onSubmit={handleChatSubmit}>
                    <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
<<<<<<< HEAD

            <div className="sentence-container">
                {currentSentence.split('').map((char, index) => (
                    <span
                        key={index}
                        className={
                            index < userInput.length
                                ? userInput[index] === char
                                    ? 'correct'
                                    : 'incorrect'
                                : ''
                        }
                    >
                        {char}
                    </span>
                ))}
            </div>

            <input
                type="text"
                value={userInput}
                onChange={handleInput}
                disabled={time === 0}
                placeholder="Start typing..."
                className="typing-input"
            />

            {time === 0 && (
                <div className="game-over">
                    <div className="game-over-title">Game Over!</div>
                    <div className="final-score">Final WPM: {wordsPerMinute}</div>
=======
        <div className="container">
            <div className="game-container">
                <h1 className="title">Sentence Typing Game</h1>
                {isGameStarted && (
                    <>
                        <div className="timer">Time Left: {time}</div>
                        <p>Your Score: {score}</p>
                        <div className="sentence">{sentence}</div>
                        {!isGameOver && (
                            <div className="input-container">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="Type here..."
                                    autoFocus
                                />
                            </div>
                        )}
                        {isGameOver && (
                            <div className="game-over">
                                <p>Game Over!</p>
                                <p>Your Score: {score}</p>
                            </div>
                        )}
                    </>
                )}
            </div>
            <div className="chat-container">
                <div className="chat-messages">
                    {chatMessages.map((msg, index) => (
                        <div key={index} className="chat-message">
                            <strong>{msg.sender}:</strong> {msg.message}
                        </div>
                    ))}
>>>>>>> 9d46fa049dbbe3fbb0ef59f3260f15133da6d0e7
                </div>
                <form onSubmit={handleChatSubmit}>
                    <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
=======
>>>>>>> parent of 92b9f23 (Added multiplayer game logic and enable chat system , improved styling and made page responsive)
        </div>
    );
};

export default TypingGame;
