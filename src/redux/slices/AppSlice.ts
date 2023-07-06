import { createSlice } from "@reduxjs/toolkit";
import { AppTypeInitialState } from "../../utils/Types";


const initialState: AppTypeInitialState = {
    isLoading: false,
    userInfo: undefined,
    toasts: [],
    currentPokemonTab: ""
};

export const AppSlice = createSlice({
    name: "app",
    initialState,
    reducers: {},
});

export const {} = AppSlice.actions;