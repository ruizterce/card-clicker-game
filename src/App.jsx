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
      <Scoreboard score={score} gameOver={gameOver} />
      {gameOver ? (
        <button onClick={resetGame}>Play Again</button>
      ) : (
        <Gameboard
          number="5"
          onGameOver={handleGameOver}
          onScoreChange={handleScoreChange}
        />
      )}
    </>
  );
}

export default App;
