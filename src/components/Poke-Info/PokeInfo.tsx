import { useEffect, useState } from "react";
import styles from "./poke-info.module.scss";
import { generatedPokemonType } from "../../utils/Types";
import PokeCard from "../Poke-Card/PokeCard";
import {
  EvolutionData,
  getEvolutionData,
} from "../../redux/reducers/getEvolvPokemonData";
import { useAppDispatch } from "../../Hooks/hooks";

interface Props {
  pokemon: generatedPokemonType;
  onClose: () => void;
}

const PokeInfo = ({ pokemon, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const [evolutionChain, setEvolutionChain] = useState<EvolutionData[]>([]);

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      try {
        if (pokemon.species && pokemon.species!.url) {


          if (pokemon.species && pokemon.species.url) {
            dispatch(getEvolutionData(pokemon.species.url))
              .then((action) => {
                if (action.payload) {
                  setEvolutionChain(action.payload as EvolutionData[]);
                }
              })
              .catch((error) => {
                console.error("Error fetching evolution chain:", error);
              });
          } else {
            console.error("Invalid species information");
          }
        } else {
          console.error("Error: Invalid pokemon.species object");
        }
      } catch (error) {
        console.error("Error fetching evolution chain:", error);
      }
    };

    fetchEvolutionChain();
  }, [dispatch, pokemon.species, pokemon.species?.url, evolutionChain]);


  return (
      <div className={styles["poke-info-wrapper"]}>
        <div className={styles["poke-info-inner"]}>
          <div className={styles["poke-info-card"]}>
            <PokeCard
              id={pokemon.id}
              image={
                pokemon.sprites.versions["generation-v"]["black-white"].animated
                  .front_default ||
                pokemon.sprites.other["official-artwork"].front_default
              }
              name={pokemon.name}
              types={pokemon.types.map((type) => type.type.name)}
              onInfoClick={() => {}}
              isModalOpen={true}
            />
          </div>
          <div className={styles["poke-info-content"]}>
            <div className={styles["poke-info-content-abilities"]}>
              <h1>Abilities</h1>
              {pokemon.abilities?.map((ability) => (
                <p key={ability.ability.name}>{ability.ability.name}</p>
              ))}
            </div>

                <div className={styles["poke-info-content-evolution"]}>
                <h1>Evolution</h1>
                <div className={styles["poke-info-content-evolution-inner"]}>
              {evolutionChain.map((evolutionData, index) => (
                <div key={index} className={styles['poke-info-content-evolution__item']}>
                    <img
                    className={styles['poke-info-content-evolution__item__image']}
                    src={evolutionData.image}
                    alt={evolutionData.speciesName}
                  />
                  <p className={styles['poke-info-content-evolution__item__text']}>{evolutionData.speciesName}</p>
                </div>
              ))}
            </div>
              </div>
          </div>
          <button className={styles["poke-info-close"]} onClick={onClose}>
            &times;
          </button>
        </div>
      </div>
  );
};

export default PokeInfo;
