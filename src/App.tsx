import { useEffect, useState } from 'react';
import styles from './app.module.scss';
import Header from './components/Header/Header';
import PokeList from './components/Poke-List/PokeList';
import { useAppDispatch, useAppSelector } from './Hooks/hooks';
import { getInitialPokemonData } from './redux/reducers/getInitialPokemonData';
import Loader from './components/Loader/Loader';
import Filters from './components/Filters/Filters';
import { regionLimits } from '../src/utils/regionTypes';
import Background from './components/Background/Background';

const App = () => {
  const dispatch = useAppDispatch();
  const { allPokemon, pending, regionFilter, typeFilter, sortBy } = useAppSelector(({ pokemon }) => pokemon)
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getInitialPokemonData());
  }, [dispatch, regionFilter]);

  let filteredPokemon = Array.isArray(allPokemon) ? [...allPokemon] : [];

  if (regionFilter && regionFilter !== 'Kanto') {
    const { limit, offset } = regionLimits[regionFilter] || { limit: 0, offset: 0 };
    filteredPokemon = filteredPokemon.filter((pokemon) => pokemon.id >= offset + 1 && pokemon.id <= offset + limit);
  }

  if (typeFilter) {
    filteredPokemon = filteredPokemon.filter((pokemon) =>
    pokemon.types.some((type: any) => type.type && type.type.name && type.type.name.toLowerCase() === typeFilter.toLowerCase())
  );
}

if (sortBy) {
  filteredPokemon = [...filteredPokemon];
  filteredPokemon.sort((a, b) => {
    if (sortBy === "id") {
      return a.id - b.id;
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "favorites") {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const favoritePokemonIds = favorites.map((favorite: { id: number }) => favorite.id);
      filteredPokemon = filteredPokemon.filter((pokemon) => favoritePokemonIds.includes(pokemon.id));
    }
    return 0;
  });
};


  if (searchQuery.length > 0) {
    filteredPokemon = filteredPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  return (
    <div className={styles.app}>
     <Background />
     <div className={styles['app-wrapper']}>
        <Header onSearch={handleSearch} />
      {pending ? 
        <Loader /> 
        :
      <div className={styles['app-container']}>
        <Filters />
        <div className={styles['app-pokecard-container']}>
        <PokeList pokemons={filteredPokemon}/>
        </div> 
      </div>
        }
    </div>
   </div>
  );
}

export default App;
