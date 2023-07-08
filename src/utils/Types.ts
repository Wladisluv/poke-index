  export interface PokemonInitialStateType {
    allPokemon: genericPokemonType[] | undefined;
    pending: any;
    rejected: any;
    regionFilter: string | null;
    typeFilter: string | null;
    sortBy: string | null;
    types: string[];
  }
  
  export interface genericPokemonType {
    region: string;
    sprites: any;
    name: string;
    url: string;
    id: number;
    image: string;
    types: [
      {
        type: {
          name?: string;
        }
      }
    ]
  }

  export interface generatedPokemonType {
    sprites: any;
    url: any;
    name: string;
    id: number;
    image: string;
    types: [
      {
        type: {
          name?: string;
        }
      }
    ]
  }

  export interface pokemonTypeInterface {
    [key: string]: {
        image: string,
        resistance: string[];
        strenght: string[];
        weakness: string[];
        vulnerable: string[];
    }
  }