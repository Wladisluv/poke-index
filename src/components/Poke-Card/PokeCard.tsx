import styles from "./pokecard.module.scss";
import { PokeCardSvg } from "./PokeCardSvg";

interface Props {
  id: number,
  image: any,
  name: string,
  type: any,
}

const PokeCard = ({id, image, name, type}: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.pokecard}>
      <span className={styles.pokecard__id}>#{String(id).padStart(3, '0')}</span>
      <div className={styles["pokecard-star-container"]}>
        {/* <span className={styles.pokecard__star}></span> */}
        <PokeCardSvg id="star"/>
      </div>
      <div className={styles["pokecard-img-container"]}>
        <img height="150px" src={image} alt="poke img" />
      </div>
        <div className={styles.pokecard__name}>
        <h3>{name}</h3>
        </div>
      <div className={styles["pokecard-type"]}>
        <div className={styles['pokecard-type__inner']}>
          <img src={`${type.type.name}.png`} alt="poke-type" />
        </div>
      </div>
    </div>
    </div>
  );
};

export default PokeCard;
