import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getEvolutionData = createAsyncThunk(
  "pokemon/evolutionData",
  async (speciesUrl: string) => {
    try {
      const speciesResponse = await axios.get(speciesUrl);
      const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
      const evolutionChainResponse = await axios.get(evolutionChainUrl);
      const evolutionChainData = extractEvolutionChainData(evolutionChainResponse.data);

      return evolutionChainData;
    } catch (error) {
      console.error('Error fetching evolution chain:', error);
      throw error;
    }
  }
);

export interface EvolutionData {
  speciesName: string;
  image: string;
}

const extractEvolutionChainData = (evolutionChainData: any): EvolutionData[] => {
  const chain = evolutionChainData.chain;
  const evolutionChain: EvolutionData[] = [];

  const extractData = (chainData: any) => {
    const speciesName = chainData.species.name;
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${chainData.species.url.split('/').slice(-2, -1)[0]}.png`;

    evolutionChain.push({ speciesName, image });

    if (chainData.evolves_to.length > 0) {
      extractData(chainData.evolves_to[0]);
    }
  };

  extractData(chain);

  return evolutionChain;
};