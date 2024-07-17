import React, { useState, useEffect } from "react";

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

  return (
    <div onClick={onClick} style={{ cursor: "pointer" }}>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    </div>
  );
}
