import styles from './CartItem.module.css';

const CartItem = ({ name, price, amount, onAdd, onRemove }) => {
  const parsedPrice = `$${price.toFixed(2)}`;

  return (
    <li className={styles['cart-item']}>
      <div className={styles.qtInfo}>
        <h2>{name}</h2>
        <div className={styles.summary}>
          <span className={styles.price}>{parsedPrice}</span>
          <span className={styles.amount}>x {amount}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={onAdd}>+</button>
        <button onClick={onRemove}>−</button>
      </div>
    </li>
  );
};

export default CartItem;
