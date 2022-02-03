import { useState } from 'react';
import CartProvider from './store/CartProvider';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import './App.css';

function App() {
  const [cartIsEnabled, setcartIsEnabled] = useState(false);

  const clickCartHandler = () => {
    setcartIsEnabled(true);
  };

  const hideCartHandler = () => {
    setcartIsEnabled(false);
  };

  return (
    <CartProvider>
      {cartIsEnabled && <Cart onHideCart={hideCartHandler} />}
      <Header onCartClick={clickCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
