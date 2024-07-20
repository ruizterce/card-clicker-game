import React, { useState, useEffect } from "react";
import "../styles/Scoreboard.css";

export default function Scoreboard({
  cardQty,
  onGameOver,
  score,
  gameOver,
  onHighScore,
  onScoreChange,
}) {
  const [highScore, setHighScore] = useState(0);

  // Initialize high score from localStorage
  useEffect(() => {
    const storedHighScore = parseInt(localStorage.getItem("highScore")) || 0;
    setHighScore(storedHighScore);
    onHighScore(storedHighScore);
  }, []);

  // Update high score in localStorage when game is over
  useEffect(() => {
    if (gameOver && score > highScore) {
      setHighScore(score);
      localStorage.setItem("highScore", score);
      onHighScore(score);
    }
  }, [gameOver, score, highScore]);

  // End game if all cards have been clicked
  useEffect(() => {
    if (score === cardQty) {
      onGameOver();
    }
  }, [score]);

  // Reset high score
  function resetHighScore() {
    setHighScore(0);
    localStorage.setItem("highScore", 0);
    onHighScore(0);
    onScoreChange(0);
  }

  return (
    <div className="scoreboard">
      <div className="text-container">
        {gameOver ? (
          score === cardQty ? (
            <div>Congratulations! You clicked on every Pokémon!</div>
          ) : (
            <div>Game Over! You clicked twice on the same Pokémon.</div>
          )
        ) : (
          <div>Click on each Pokémon only once!</div>
        )}
      </div>
      <div className="score-container">
        <div>
          <span>Score: {score}</span>
        </div>
        <div>
          <span>High Score: {highScore}</span>
        </div>
        <button className="reset-high-score-btn" onClick={resetHighScore}>
          {" "}
          Reset
        </button>
      </div>
    </div>
  );
}
