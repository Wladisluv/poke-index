import { useState } from "react";
import styles from './poke-list-modal.module.scss';
import { generatedPokemonType } from "../../utils/Types";
import PokeCard from "../Poke-Card/PokeCard";
import PokeInfo from "../Poke-Info/PokeInfo";

const PokeList = ({ pokemons }: { pokemons: generatedPokemonType[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<generatedPokemonType | null>(null);

  const handleInfoClick = (pokemon: generatedPokemonType) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  const closeModal = () => {
      setIsModalOpen(false);
  };

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      {pokemons?.map((data: generatedPokemonType) => {
        const types = data.types.map((type) => type.type.name);
        return (
          <PokeCard
            key={data.id}
            name={data.name}
            id={data.id}
            image={data.sprites.versions['generation-v']['black-white'].animated.front_default || data.sprites.other['official-artwork'].front_default}
            types={types}
            onInfoClick={() => handleInfoClick(data)}
            isModalOpen={false}
          />
        );
      })}
      {isModalOpen && selectedPokemon && (
        <div className={styles.modal} onClick={handleOutsideClick}>
        <PokeInfo pokemon={selectedPokemon} onClose={closeModal} />
      </div>
      )}
    </>
  );
};

export default PokeList;