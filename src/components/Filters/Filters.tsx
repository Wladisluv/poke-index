import styles from "./filters.module.scss";
import {
  setRegionFilter,
  setTypeFilter,
  setSortBy,
} from "../../redux/slices/PokemonSlice";
import { useAppDispatch } from "../../Hooks/hooks";
import { pokemonRegions } from "../../utils/regionTypes";
import { useState } from "react";

const Filters = () => {
  const [currentRegion, setCurrentRegion] = useState("");
  const dispatch = useAppDispatch();

  const handleRegionFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const currentRegion = event.target.value;
    dispatch(setRegionFilter(currentRegion !== "Kanto" ? currentRegion : null));
    setCurrentRegion(currentRegion);
  };
  

  const handleTypeFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const type = event.target.value;
    dispatch(setTypeFilter(type !== "all" ? type : null));
  };

  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortBy = event.target.value;
    dispatch(setSortBy(sortBy !== "none" ? sortBy : null));
  };

  const pokemonTypes = [
    "Normal",
    "Fire",
    "Water",
    "Grass",
    "Electric",
    "Ice",
    "Fighting",
    "Poison",
    "Ground",
    "Flying",
    "Psychic",
    "Bug",
    "Rock",
    "Ghost",
    "Dragon",
    "Dark",
    "Steel",
    "Fairy",
  ];
  
  return (
    <div className={styles["filters-container"]}>
      <div className={styles.filters__item}>
        <label htmlFor="region-filter" className={styles.filters__label}>
          Region
        </label>
        <select
          id="region-filter"
          onChange={handleRegionFilterChange}
          value={currentRegion}
          className={styles.filters__select}
        >
          {pokemonRegions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filters__item}>
        <label htmlFor="type-filter">Type</label>
        <select id="type-filter" onChange={handleTypeFilterChange}>
          <option value="all">All</option>
          {pokemonTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filters__item}>
        <label htmlFor="sort-by">Sort By</label>
        <select id="sort-by" onChange={handleSortByChange}>
          <option value="none">None</option>
          <option value="id">Id</option>
          <option value="name">Name</option>
          <option value="favorites">Favorites</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;