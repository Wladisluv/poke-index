import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PokemonInitialStateType } from "../../utils/Types";
import { getInitialPokemonData } from "../reducers/getInitialPokemonData";

interface PokemonSliceState extends PokemonInitialStateType {
  regionFilter: string | null;
  typeFilter: string | null;
  sortBy: string | null;
}

const initialState: PokemonInitialStateType = {
  allPokemon: [],
  pending: false,
  rejected: null,
  regionFilter: null,
  typeFilter: null,
  sortBy: null,
  types: [],
};

export const PokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setRegionFilter: (state, action: PayloadAction<string | null>) => {
      state.regionFilter = action.payload;
    },
    setTypeFilter: (state, action: PayloadAction<string | null>) => {
      state.typeFilter = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string | null>) => {
      state.sortBy = action.payload;
    },
  },

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

export const { setRegionFilter, setTypeFilter, setSortBy } = PokemonSlice.actions