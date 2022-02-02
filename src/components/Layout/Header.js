import HeaderCart from './HeaderCart';
import meals from '../../assets/meals.jpg';
import styles from './Header.module.css';

const Header = ({ onCartClick }) => {
  return (
    <>
      <header className={styles.header}>
        <h1>Di Giorgio</h1>
        <HeaderCart onClick={onCartClick} />
      </header>
      <div className={styles.imgCont}>
        <img src={meals} alt="Meals of table!" draggable="false" />
      </div>
    </>
  );
};

export default Header;
