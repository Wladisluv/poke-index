import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type Poke = {
    id: number,
    image: any,
    name: string,
    type: any,
}

type PokesState = {
    list: Poke[];
    loading: boolean;
    error: string | null;
}

export const fetchPokes = createAsyncThunk<Poke[], undefined, {rejectValue: string}>(
    'Pokes/fetchPokes',
    async function (_, { rejectWithValue }) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/`);

        if (!response.ok) {
            return rejectWithValue('Server error');
        }

        const data = await response.json();

        return data;
    }
);

const initialState: PokesState = {
    list: [],
    loading: false,
    error: null,
}

const PokeSlice = createSlice({
    name: "pokes",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchPokes.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchPokes.fulfilled, (state, action) => {
            state.list = action.payload;
            state.loading = false;
          })
          .addCase(fetchPokes.rejected, (state) => {
            state.error = 'err';
          });
      },
});

export default PokeSlice.reducer;