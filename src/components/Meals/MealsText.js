import styles from './MealsText.module.css';

const MealsText = () => {
  return (
    <section className={styles.summary}>
      <h2>Great selection, even better prices!</h2>
      <p className={styles.commentary}>
        Fancy <span className={styles.keyPoints}>pasta</span> ? A juicy{' '}
        <span className={styles.keyPoints}>burger</span> ? Or would you rather
        have our bespoke BBQ <span className={styles.keyPoints}> tenders</span>?
        Feel free to choose from our vast selection!
      </p>
      <p className={styles.commentary}>
        All meals are <span className={styles.underlined}>high-quality</span>,
        prepared <span className={styles.underlined}>fresh</span> and served{' '}
        <span className={styles.underlined}>hot</span>!
      </p>
    </section>
  );
};

export default MealsText;
