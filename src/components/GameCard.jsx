import React, { useState, useEffect } from "react";
import "../styles/GameCard.css";

export default function GameCard({ id, onClick, clicked }) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch a Pokemon's info from pokeapi.co
  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);

      // Check localStorage for cached data
      const cachedData = localStorage.getItem(`pokemon-${id}`);
      if (cachedData) {
        setPokemon(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      // Fetch data from API if not cached
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon-form/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response from pokeapi.co failed");
        }
        const data = await response.json();
        // Cache the data in localStorage
        localStorage.setItem(`pokemon-${id}`, JSON.stringify(data));
        setPokemon(data);
      } catch (error) {
        setError(error);
      }

      setLoading(false);
    };

    fetchPokemon();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!pokemon) {
    return <div>No data available</div>;
  }

  // Pokemon type colour map (thanks https://github.com/apaleslimghost)
  const typeColours = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };

  return (
    <div
      className="game-card"
      onClick={onClick}
      style={{
        cursor: "pointer",
        backgroundColor: typeColours[pokemon.types[0].type.name],
      }}
    >
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    </div>
  );
}
