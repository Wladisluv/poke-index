import Input from '../Input/Input';
import { HeaderSvgSelector } from './HeaderSvgSelector';
import styles from './header.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles['header-wrapper']}>
      <div className={styles['header-container']}>
      <div className={styles.header__logo}>
      <HeaderSvgSelector id='logo'/>
      </div>
        <div className={styles['header-right']}>
            <Input/>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Header