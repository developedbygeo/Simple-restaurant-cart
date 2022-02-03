import styles from './Modal.module.css';
import reactDom from 'react-dom';

const modalParent = document.querySelector('#overlay');

const Backdrop = ({ onClose }) => {
  return <div className={styles.backdrop} onClick={onClose} />;
};

const ModalOverlay = ({ children }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

const Modal = ({ onHideCart, children }) => {
  return (
    <>
      {reactDom.createPortal(<Backdrop onClose={onHideCart} />, modalParent)}
      {reactDom.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        modalParent
      )}
    </>
  );
};

export default Modal;
