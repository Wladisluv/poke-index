// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { pokemonsRoute, pokeNames } from "../../utils/Constants";

// export const getInitialPokemonData = createAsyncThunk(
//   "pokemon/initialData",
//   async () => {
//     try {
//       const response = await axios.get(`${pokemonsRoute}`);
//       const pokemonData = response.data.results;
//       const pokemonNames = pokemonData.map((pokemon: any) => pokemon.name);

//       const pokemonPromises = pokemonNames.map((pokemon: any) =>
//         axios.get(`${pokeNames}/${pokemon}`)
//       );
//       const pokemonResponses = await Promise.all(pokemonPromises);
//       const pokemonDataArray = pokemonResponses.map(
//         (response: any) => response.data
//       );

//       return pokemonDataArray;
//     } catch (err) {
//       console.error(err);
//     }
//   }
// );

// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { pokeNames } from "../../utils/Constants";
// import { regionLimits } from "../../utils/regionTypes";
// import { RootState } from "../store";

// export const getInitialPokemonData = createAsyncThunk(
//   "pokemon/initialData",
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const regionFilter: keyof typeof regionLimits = 'Kanto';
//       console.log('regionFilter >', regionFilter);
      
// const limit = regionFilter ? regionLimits[regionFilter]?.limit : null;
// const offset = regionFilter ? regionLimits[regionFilter]?.offset : 0;

// console.log('limit:', limit);
// console.log('offset:', offset);

//       const response = await axios.get(`${pokeNames}?limit=${limit}&offset=${offset}`);
//       const pokemonData = response.data.results;
//       const pokemonNames = pokemonData.map((pokemon: any) => pokemon.name);

//       const pokemonPromises = pokemonNames.map((pokemon: any) =>
//         axios.get(`${pokeNames}/${pokemon}`)
//       );
//       const pokemonResponses = await Promise.all(pokemonPromises);
//       const pokemonDataArray = pokemonResponses.map(
//         (response: any) => response.data
//       );

//       return pokemonDataArray;
//     } catch (err) {
//       console.error(err);
//       throw err;
//     }
//   }
// );


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
      console.log("selectedRegion >", regionFilter);

      const limit = regionLimits[selectedRegion]?.limit || null;
      const offset = regionLimits[selectedRegion]?.offset || 0;

      console.log("limit:", limit);
      console.log("offset:", offset);

      dispatch(setRegionFilter(selectedRegion)); // Update the region filter in the state

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