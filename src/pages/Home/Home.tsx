import { useEffect } from 'react'
import Header from '../../components/Header/Header'
import styles from './home.module.scss';
import { useAppDispatch } from '../../Hooks/hooks';
import { fetchPokes } from '../../redux/PokeSlice';
import PokeList from '../../components/Poke-List/PokeList';
import { getInitialPokemonData } from '../../redux/reducers/getInitialPokemonData';

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getInitialPokemonData());
  }, [dispatch])
  
  return (
    <div className={styles['home-wrapper']}>
        <Header/>
      <div className={styles['home-container']}>
        <div className={styles['home-pokecard-container']}>
        <PokeList />
        </div>
      </div>
    </div>
  )
}

export default Home