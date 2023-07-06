export interface AppTypeInitialState {
    isLoading: boolean;
    userInfo: undefined | { email: string };
    toasts: string[];
    currentPokemonTab: string;
  }
  
  export interface PokemonInitialStateType {
    allPokemon: undefined | genericPokemonType[];
  }
  
  export interface genericPokemonType {
    name: string;
    url: string;
  }