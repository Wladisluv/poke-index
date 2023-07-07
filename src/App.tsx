import { useEffect } from 'react';
import styles from './app.module.scss';
import Header from './components/Header/Header';
import PokeList from './components/Poke-List/PokeList';
import { useAppDispatch, useAppSelector } from './Hooks/hooks';
import { getInitialPokemonData } from './redux/reducers/getInitialPokemonData';
import Loader from './components/Loader/Loader';


const App = () => {
  const dispatch = useAppDispatch();
  const { allPokemon } = useAppSelector(({ pokemon }) => pokemon)
  const pending = useAppSelector((state) => state.pokemon.pending);
  

  useEffect(() => {
    dispatch(getInitialPokemonData());
  }, [dispatch]);

  return (
    <div className={styles['app-wrapper']}>
        <Header/>
      <div className={styles['app-container']}>
      {pending ? 
        <Loader /> 
        :
        <div className={styles['app-pokecard-container']}>
        <PokeList pokemons={allPokemon ? [...allPokemon] : []} />
        </div> 
        }
      </div>
    </div>
  );
}

export default App;
