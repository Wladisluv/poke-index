import styles from './input.module.scss';

const Input = () => {
  return (
    <div className={styles.search}>
      <input
    className={styles['search-input']}
    type='text'
    placeholder='Search poke'
    />
    </div>
  )
}

export default Input