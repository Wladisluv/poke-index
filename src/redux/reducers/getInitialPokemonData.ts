import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pokeNames } from "../../utils/Constants";
import { regionLimits } from "../../utils/regionTypes";
import { RootState } from "../store";
import { setRegionFilter } from "../slices/PokemonSlice";

export const getInitialPokemonData = createAsyncThunk(
  "pokemon/initialData",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const { regionFilter } = (getState() as RootState).pokemon;
      const selectedRegion = regionFilter ? regionFilter : "Kanto";

      const limit = regionLimits[selectedRegion]?.limit || null;
      const offset = regionLimits[selectedRegion]?.offset || 0;

      dispatch(setRegionFilter(selectedRegion));

      const response = await axios.get(`${pokeNames}?limit=${limit}&offset=${offset}`);
      const pokemonData = response.data.results;
      const pokemonNames = pokemonData.map((pokemon: any) => pokemon.name);

      const pokemonPromises = pokemonNames.map((pokemon: any) =>
        axios.get(`${pokeNames}/${pokemon}`)
      );
      const pokemonResponses = await Promise.all(pokemonPromises);
      const pokemonDataArray = pokemonResponses.map((response: any) => response.data);

      return pokemonDataArray;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);