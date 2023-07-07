import { pokemonTypes } from "../../utils/pokemonTypes";
import { colorTypeGradients } from "../../utils/colorTypeGradients";
import { PokeCardSvg } from "./PokeCardStarSvg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import styles from "./pokecard.module.scss";

interface Props {
  id: number;
  image: string;
  name: string;
  types: (string | undefined)[];
}

const PokeCard = ({ id, image, name, types }: Props) => {
  const validTypes = types.filter((type) => type) as string[];

  let finalColor;

  if (validTypes.length === 2) {
    finalColor = colorTypeGradients(
      validTypes[0],
      validTypes[1],
      validTypes.length
    );
  } else {
    finalColor = colorTypeGradients(
      validTypes[0],
      validTypes[0],
      validTypes.length
    );
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.pokecard}
        style={{
          background: `radial-gradient(circle, ${finalColor[0]}, ${finalColor[1]})`,
        }}
      >
        <span className={styles.pokecard__id}>
          #{String(id).padStart(3, "0")}
        </span>
        <div className={styles["pokecard-star-container"]}>
          <PokeCardSvg id="star" />
        </div>
        <div className={styles["pokecard-img-container"]}>
          <LazyLoadImage
            height="140px"
            src={image}
            alt="poke img"
            visibleByDefault={false}
            delayMethod={"debounce"}
            effect="blur"
          />
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
