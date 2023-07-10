import { useEffect, useState } from 'react';
import styles from './pokecard.module.scss';
import { pokemonTypes } from "../../utils/pokemonTypes";
import { colorTypeGradients } from "../../utils/colorTypeGradients";
import { PokeCardSvgSelector } from "./PokeCardSvgSelector";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface Props {
  id: number;
  image: string;
  name: string;
  types: (string | undefined)[];
  onInfoClick: () => void;
  isModalOpen: boolean;
}

const PokeCard = ({ id, image, name, types, onInfoClick, isModalOpen }: Props) => {
  const validTypes = types.filter((type) => type) as string[];
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isInitiallyFavorite = favorites.some((fav: any) => fav.id === id);
    setIsFavorite(isInitiallyFavorite);
  }, [id]);

  const handleAddToFav = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav: any) => fav.id !== id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      favorites.push({ id, name, image, types });
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  let finalColor;

  if (validTypes.length === 2) {
    finalColor = colorTypeGradients(validTypes[0], validTypes[1], validTypes.length);
  } else {
    finalColor = colorTypeGradients(validTypes[0], validTypes[0], validTypes.length);
  }

  return (
    <div className={styles.wrapper}>
      <div className={isModalOpen ? `${styles.pokecard} ${styles.modal}` : styles.pokecard} style={{ background: `radial-gradient(circle, ${finalColor[0]}, ${finalColor[1]})` }}>
        <span className={styles.pokecard__id}>#{String(id).padStart(3, "0")}</span>
        <div className={styles['pokecard-top']}>
          <div className={isModalOpen ? `${styles["pokecard-top__info"]} ${styles.disable}` : styles['pokecard-top__info']} onClick={onInfoClick}>
          <PokeCardSvgSelector id="info" />
          </div>
        <div className={
          isModalOpen ?
          `${styles["pokecard-top__star"]} ${styles.disable}`
          :
          isFavorite ? `${styles["pokecard-top__star"]} ${styles.fav}` 
          : 
          styles["pokecard-top__star"]} onClick={handleAddToFav}
          >
          <PokeCardSvgSelector id="star" />
        </div>
        </div>
        <div className={isModalOpen ? `${styles["pokecard-img-container"]} ${styles.modal}` : styles["pokecard-img-container"]}>
          <LazyLoadImage height="140px" src={image} alt="poke img" visibleByDefault={false} delayMethod={"debounce"} effect="blur" />
        </div>
        <div className={styles.pokecard__name}>
          <h3>{name}</h3>
        </div>
        <div className={styles["pokecard-type"]}>
          {validTypes.map((type, index) => (
            <div className={styles["pokecard-type__inner"]} key={`${type}-${index}`}>
              <img src={pokemonTypes[type].image} alt="poke-type" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokeCard;