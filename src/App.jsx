import React, { useState } from "react";
import "./App.css";
import Gameboard from "./components/Gameboard";
import Scoreboard from "./components/Scoreboard";

function App() {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(2);
  const [isHighScore, setIsHighScore] = useState(false);
  const cardQty = level;

  // Handle game over
  function handleGameOver() {
    setGameOver(true);
  }

  // Handle score change
  function handleScoreChange(newScore) {
    setScore(newScore);
  }

  // Handle new high score
  function handleHighScore(score) {
    setLevel(score + 1);
    setIsHighScore(true);
  }

  // Reset the game
  function resetGame() {
    setScore(0);
    setGameOver(false);
    setIsHighScore(false);
  }

  return (
    <>
      <div className="title-container">
        <h1>Pokémon</h1>
        <p> Memory Game</p>
      </div>
      <div className="game">
        <Scoreboard
          cardQty={cardQty}
          onGameOver={handleGameOver}
          score={score}
          gameOver={gameOver}
          onHighScore={handleHighScore}
        />
        <Gameboard
          cardQty={cardQty}
          onGameOver={handleGameOver}
          onScoreChange={handleScoreChange}
          gameOver={gameOver}
        />
        {gameOver && (
          <button className="play-again-btn" onClick={resetGame}>
            {isHighScore ? (
              <>
                <p>Next</p>
                <p>Level</p>
              </>
            ) : (
              <>
                <p>Play</p>
                <p>Again</p>
              </>
            )}
          </button>
        )}
      </div>

      <div className="credits">
        <button>
          <a
            href="https://github.com/ruizterce/card-clicker-game"
            target="blank"
          >
            Crafted with love @ruizterce
          </a>
        </button>
      </div>
    </>
  );
}

export default App;
