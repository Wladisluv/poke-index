import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pokemonsRoute, pokeNames } from "../../utils/Constants";

export const getInitialPokemonData = createAsyncThunk(
  "pokemon/initialData",
  async () => {
    try {
      const response = await axios.get(`${pokemonsRoute}`);
      const pokemonData = response.data.results;
      const pokemonNames = pokemonData.map((pokemon: any) => pokemon.name);

      const pokemonPromises = pokemonNames.map((pokemon: any) =>
        axios.get(`${pokeNames}/${pokemon}`)
      );
      const pokemonResponses = await Promise.all(pokemonPromises);
      const pokemonDataArray = pokemonResponses.map(
        (response: any) => response.data
      );

      return pokemonDataArray;
    } catch (err) {
      console.error(err);
    }
  }
);
