import { createSlice } from "@reduxjs/toolkit";
import { PokemonInitialStateType } from "../../utils/Types";
import { getInitialPokemonData } from "../reducers/getInitialPokemonData";

const initialState: PokemonInitialStateType = {
  allPokemon: undefined,
  pending: false,
  rejected: null,
};

export const PokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getInitialPokemonData.pending, (state) => {
      state.pending = true;
    });
    
    builder.addCase(getInitialPokemonData.fulfilled, (state, action) => {
      state.allPokemon = action.payload;
      state.pending = false;
    });

    builder.addCase(getInitialPokemonData.rejected, (state, action) => {
      state.pending = false;
      state.rejected = action.error.message;
      console.error(action.error);
    });
    },
});

export const {} = PokemonSlice.actions