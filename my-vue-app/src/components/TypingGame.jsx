import React, { useState, useEffect } from 'react';
import './app.css';
import io from 'socket.io-client';


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

const TypingGame = ({ score, setScore, isGameOver, setIsGameOver, socket }) => {
    const [sentence, setSentence] = useState('');
    const [input, setInput] = useState('');
    const [time, setTime] = useState(15);
    const [isGameStarted, setIsGameStarted] = useState(false);

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
            }
        }
    };

    return (
        <div className="container">
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
                </>
            )}
            {isGameOver && (
                <div className="game-over">
                    <p>Game Over!</p>
                    <p>Your Score: {score}</p>
                </div>
            )}
        </div>
    );
};

export default TypingGame;
