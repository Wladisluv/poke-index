import { generatedPokemonType } from "../../utils/Types"
import PokeCard from "../Poke-Card/PokeCard"

const PokeList = ({ pokemons }: { pokemons: generatedPokemonType [] }) => {
  return (
    <>
        {pokemons?.map((data: generatedPokemonType ) => {
          const types = data.types.map((type) => type.type.name);
          return (
            <PokeCard 
            key={data.id}
            name={data.name}
            id={data.id}
            image={data.sprites.versions['generation-v']['black-white'].animated.front_default}
            types={types}
            />
          )
          })}
    </>
  )
}

export default PokeList