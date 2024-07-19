import React, { useState, useEffect } from "react";
import GameCard from "./GameCard";
import "../styles/Gameboard.css";

export default function Gameboard({
  cardQty,
  onGameOver,
  onScoreChange,
  gameOver,
}) {
  // Generate a random list of {count} unique IDs between {min} and {max}
  function generateIdList(count, min, max) {
    const itemIdList = [];
    while (itemIdList.length < count) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!itemIdList.includes(randomNumber)) {
        itemIdList.push(randomNumber);
      }
    }
    return itemIdList;
  }

  // Generate a random list of {cardQty} 1st generation Pokemon IDs (1-151)
  const [itemIdList, setItemIdList] = useState(generateIdList(cardQty, 1, 151));

  // Shuffle itemIdList list order
  function shuffleList() {
    const shuffledList = [...itemIdList].sort(() => Math.random() - 0.5);
    setItemIdList(shuffledList);
  }

  // Register clicked cards
  const [clickedCards, setClickedCards] = useState([]);

  // Handle card click
  function handleCardClick(id) {
    if (clickedCards.includes(id)) {
      onGameOver();
    } else {
      const newClickedCards = [...clickedCards, id];
      setClickedCards(newClickedCards);
      onScoreChange(newClickedCards.length);
      shuffleList();
    }
  }

  // Reset itemIdList and clickedCards when gameOver changes to false
  useEffect(() => {
    if (!gameOver) {
      setItemIdList(generateIdList(cardQty, 1, 151));
      setClickedCards([]);
    }
  }, [gameOver, cardQty]);

  return (
    <div className="gameboard">
      {itemIdList.map((item) => (
        <GameCard
          key={`item_${item}`}
          id={item}
          onClick={() => handleCardClick(item)}
          clicked={clickedCards.includes(item)}
          gameOver={gameOver}
        />
      ))}
    </div>
  );
}
