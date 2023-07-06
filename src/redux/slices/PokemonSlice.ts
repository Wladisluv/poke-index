import { createSlice } from "@reduxjs/toolkit";
import { PokemonInitialStateType } from "../../utils/Types";

const initialState: PokemonInitialStateType = {
  allPokemon: undefined,
};

export const PokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    
  },
});

export const {} = PokemonSlice.actions