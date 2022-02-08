import { useContext, useState } from 'react';
import CartContext from '../../store/cartContext';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CheckoutForm from './CheckoutForm';
import eatingSVG from '../../assets/eating.svg';
import styles from './Cart.module.css';

const Cart = ({ onHideCart }) => {
  const { addItem, removeItem, clearCart, totalAmount, items } =
    useContext(CartContext);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const ttlAmount = `$${totalAmount.toFixed(2)}`;
  const itemsExist = items.length > 0;

  const itemAddHandler = (item) => {
    addItem({ ...item, amount: 1 });
  };

  const itemRemoveHandler = (id) => {
    removeItem(id);
  };

  const placeOrderHandler = () => {
    setShowOrderForm(true);
  };

  const orderHandler = () => {
    setIsSubmitting(true);
    clearCart();
    setTimeout(() => {
      setIsSubmitting(false);
      setDidSubmit(true);
    }, 2000);
  };

  const cartItems = (
    <ul className={styles.cartItems}>
      {items.map((item) => (
        <CartItem
          onRemove={itemRemoveHandler.bind(null, item.id)}
          onAdd={itemAddHandler.bind(null, item)}
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
        ></CartItem>
      ))}
    </ul>
  );

  const modalActions = (
    <div className={styles.actions}>
      <button onClick={onHideCart} className={styles.buttonAlt}>
        Close
      </button>
      {itemsExist && (
        <button onClick={placeOrderHandler} className={styles.button}>
          Order
        </button>
      )}
    </div>
  );

  const cartContent = (
    <>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{ttlAmount}</span>
      </div>
      {showOrderForm && (
        <CheckoutForm onOrder={orderHandler} onCancel={onHideCart} />
      )}
      {!showOrderForm && modalActions}
    </>
  );

  const isSubmittingContent = <p>Submitting your order...</p>;

  const didSubmitContent = (
    <div className={styles.submitWrapper}>
      <h3>Order placed successfully. Bon appétit!</h3>
      <div className={styles.imgCover}>
        <img src={eatingSVG} alt="animations-of-people-eating"></img>
      </div>
      <div className={styles.actions}>
        <button onClick={onHideCart} className={styles.button}>
          Close
        </button>
      </div>
    </div>
  );

  return (
    <Modal onHideCart={onHideCart}>
      {!isSubmitting && !didSubmit && cartContent}
      {isSubmitting && isSubmittingContent}
      {!isSubmitting && didSubmit && didSubmitContent}
    </Modal>
  );
};

export default Cart;
