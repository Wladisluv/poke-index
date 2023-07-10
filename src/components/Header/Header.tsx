import Input from '../Input/Input';
import { HeaderLogoSvg } from './HeaderLogoSvg';
import styles from './header.module.scss';

interface HeaderProps {
  onSearch: (searchQuery: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <div className={styles['header-wrapper']}>
      <div className={styles['header-container']}>
      <div className={styles.header__logo}>
      <HeaderLogoSvg/>
      </div>
        <div className={styles['header-right']}>
            <Input onSearch={onSearch}/>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Header