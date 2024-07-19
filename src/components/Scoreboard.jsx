import React, { useState, useEffect } from "react";
import "../styles/Scoreboard.css";

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
    <div className="scoreboard">
      <div className="text-container">
        {gameOver ? (
          <div>Game Over! You clicked twice on the same Pokémon.</div>
        ) : (
          <div>Click on each Pokémon only once!</div>
        )}
      </div>
      <div className="score-container">
        <div>
          Score: <span>{score}</span>
        </div>
        <div>
          High Score: <span>{highScore}</span>
        </div>
      </div>
    </div>
  );
}
