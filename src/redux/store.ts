import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { AppSlice } from './slices/AppSlice';
// import { PokemonSlice } from './slices/PokemonSlice';

export const store = configureStore({
  reducer: {
    app: AppSlice.reducer,
    // pokemon: PokemonSlice.reducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;