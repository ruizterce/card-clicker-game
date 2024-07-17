import React, { useState, useEffect } from "react";

export default function Scoreboard({ score, gameOver }) {
  const [highScore, setHighScore] = useState(0);

  // Initialize high score from localStorage
  useEffect(() => {
    const storedHighScore = parseInt(localStorage.getItem("highScore")) || 0;
    setHighScore(storedHighScore);
  }, []);

  // Update high score in localStorage when game is over
  useEffect(() => {
    if (gameOver && score > highScore) {
      setHighScore(score);
      localStorage.setItem("highScore", score);
    }
  }, [gameOver, score, highScore]);

  return (
    <div>
      <p>Score: {score}</p>
      <p>High Score: {highScore}</p>
      {gameOver && <p>Game Over</p>}
    </div>
  );
}
