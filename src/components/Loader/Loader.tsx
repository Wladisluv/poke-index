import styles from "./loader.module.scss";
import pokeballLoader from "../../assets/pokeball-loader.gif";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loader__text}>
        <h1>Loading...</h1>
      </div>
      <img src={pokeballLoader} alt="pokeball-loader" />
    </div>
  );
};

export default Loader;
