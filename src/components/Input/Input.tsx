import { useState, useEffect } from 'react';
import styles from './input.module.scss';

interface InputProps {
  onSearch: (searchQuery: string) => void;
}

const Input = ({ onSearch }: InputProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      onSearch(searchQuery);
    }, 100);

    return () => {
      clearTimeout(delayTimer);
    };
  }, [searchQuery, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={styles.search}>
      <input
        className={styles['search-input']}
        type='text'
        placeholder='Search poke'
        value={searchQuery}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;