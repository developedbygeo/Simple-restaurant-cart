import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import styles from './MealItemForm.module.css';

const MealItemForm = ({ id, addToCart }) => {
  const [isAmountValid, setIsAmountValid] = useState(true);
  const itemAmountRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const selectedAmount = itemAmountRef.current.value;
    const numericalAmount = +selectedAmount;
    if (
      numericalAmount.length === 0 ||
      numericalAmount < 1 ||
      numericalAmount > 20
    ) {
      setIsAmountValid(false);
      return;
    }
    addToCart(numericalAmount);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={itemAmountRef}
        label="Amount"
        input={{
          id: `amount${id}`,
          type: 'number',
          min: '1',
          max: '20',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>Add</button>
      {!isAmountValid && (
        <p className={styles.error}>Incorrect product amount (1-20)</p>
      )}
    </form>
  );
};

export default MealItemForm;
