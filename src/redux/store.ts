import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { PokemonSlice } from './slices/PokemonSlice';

export const store = configureStore({
  reducer: {
    pokemon: PokemonSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;