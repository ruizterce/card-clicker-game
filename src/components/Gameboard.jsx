import React, { useState } from "react";
import GameCard from "./GameCard";

export default function Gameboard({ number }) {
  // Generate a random list of {count} unique IDs between {min} and {max}
  function generateIdList(count, min, max) {
    let itemIdList = [];
    while (itemIdList.length < count) {
      let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!itemIdList.includes(randomNumber)) {
        itemIdList.push(randomNumber);
      }
    }
    return itemIdList;
  }

  // Generate a random list of {number} 1st generation Pokemon IDs(1-151)
  const [itemIdList, setItemIdList] = useState(generateIdList(number, 1, 151));

  // Shuffle itemIdList list order
  function shuffleList() {
    const shuffledList = [...itemIdList].sort(() => Math.random() - 0.5);
    setItemIdList(shuffledList);
  }

  // Register clicked cards
  const [clickedCards, setClickedCards] = useState([]);

  // Game Over
  const [gameOver, setGameOver] = useState(false);

  // Score
  const score = clickedCards.length;

  // High Score
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("highScore")) || 0
  );

  // Handle card click
  function handleCardClick(id) {
    const prevClickedCards = clickedCards;
    if (prevClickedCards.includes(id)) {
      setGameOver(true);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("highScore", score);
      }
    } else {
      setClickedCards([...prevClickedCards, id]);
      shuffleList();
    }
  }

  if (!gameOver) {
    return (
      <>
        <p>Score: {score}</p>
        <p>High Score: {highScore}</p>
        {itemIdList.map((item) => (
          <GameCard
            key={`item_${item}`}
            id={item}
            onClick={() => handleCardClick(item)}
            clicked={clickedCards.includes(item)}
          />
        ))}
      </>
    );
  } else {
    return (
      <>
        <p>Game Over</p>
        <p>Score: {score}</p>
        <p>High Score: {highScore}</p>
      </>
    );
  }
}
