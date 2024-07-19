import React, { useState } from "react";
import "./App.css";
import Gameboard from "./components/Gameboard";
import Scoreboard from "./components/Scoreboard";

function App() {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Handle game over
  function handleGameOver() {
    setGameOver(true);
  }

  // Handle score change
  function handleScoreChange(newScore) {
    setScore(newScore);
  }

  // Reset the game
  function resetGame() {
    setScore(0);
    setGameOver(false);
  }

  return (
    <>
      <div className="title-container">
        <h1>Pokémon</h1>
        <p> Memory Game</p>
      </div>
      <div className="game">
        <Scoreboard score={score} gameOver={gameOver} />
        <Gameboard
          number="15"
          onGameOver={handleGameOver}
          onScoreChange={handleScoreChange}
          gameOver={gameOver}
        />
        {gameOver && (
          <button onClick={resetGame}>
            <p>Play</p>
            <p>Again</p>
          </button>
        )}
      </div>
    </>
  );
}

export default App;
