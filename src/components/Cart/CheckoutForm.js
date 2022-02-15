import { useRef, useState } from 'react';
import styles from './CheckoutForm.module.css';

const checkEmpty = (val) => val.trim() !== '';
const notFiveChars = (val) => val.trim().length >= 4;

const CheckoutForm = ({ onCancel, onOrder }) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    address: true,
    city: true,
    postal: true,
  });
  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const providedName = nameInputRef.current.value;
    const providedAddress = addressInputRef.current.value;
    const providedPostal = postalInputRef.current.value;
    const providedCity = cityInputRef.current.value;

    const providedNameIsValid = checkEmpty(providedName);
    const providedAddressIsValid = checkEmpty(providedAddress);
    const providedCityIsValid = checkEmpty(providedCity);
    const providedPostalIsValid = notFiveChars(providedPostal);

    setFormValidity({
      name: providedNameIsValid,
      address: providedAddressIsValid,
      city: providedCityIsValid,
      postal: providedPostalIsValid,
    });

    const formIsValid =
      providedNameIsValid && providedAddressIsValid && providedCityIsValid && providedPostalIsValid;

    if (!formIsValid) {
      return;
    }
    onOrder({
      name: providedName,
      address: providedAddress,
      city: providedCity,
      postal: providedPostal,
    });
  };

  const fieldControlClasses = (field) => {
    return `${styles.ctrl} ${formValidity[field] ? '' : styles.invalid}`;
  };

  return (
    <form autocomplete="off" className={styles.ctrlForm} onSubmit={submitHandler}>
      <div className={fieldControlClasses('name')}>
        <label htmlFor="name">Full name</label>
        <input type="text" id="name" ref={nameInputRef}></input>
        {!formValidity.name && <p>Please provide a valid name.</p>}
      </div>
      <div className={fieldControlClasses('address')}>
        <label htmlFor="address">Delivery address</label>
        <input type="text" id="address" ref={addressInputRef}></input>
        {!formValidity.address && <p>Please provide a valid address.</p>}
      </div>
      <div className={fieldControlClasses('postal')}>
        <label htmlFor="postalcode">Postal Code</label>
        <input type="text" id="postalcode" ref={postalInputRef}></input>
        {!formValidity.postal && <p>Please provide your 5-character postal code.</p>}
      </div>
      <div className={fieldControlClasses('city')}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef}></input>
        {!formValidity.city && <p>Please provide a valid city.</p>}
      </div>
      <div className={styles.ctrlActions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Order</button>
      </div>
    </form>
  );
};

export default CheckoutForm;
