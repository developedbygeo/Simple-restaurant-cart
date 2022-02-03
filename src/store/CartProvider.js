import { useReducer } from 'react';
import CartContext from './cartContext';

const defaultState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  const { type } = action;
  switch (type) {
    case 'ADD_ITEM': {
      const newAmount =
        state.totalAmount + action.item.price * action.item.amount;
      // checks if there is a match between item.id & action.item.id
      const existingItemsIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      // if it exists, it is this one - else it is null
      const existingItem = state.items[existingItemsIndex];
      let updatedItems;
      // if it exists:
      if (existingItem) {
        let updatedItem;
        // shallow copy of the existing item, updating the amount to the prev + curr
        updatedItem = {
          ...existingItem,
          amount: existingItem.amount + action.item.amount,
        };
        // creating a shallow copy to not edit the existing array in memory
        updatedItems = [...state.items];
        // assigning existing item (based on index) to our freshly created item (with the updated amount)
        updatedItems[existingItemsIndex] = updatedItem;
      } else {
        // else, we just concat with the existing array
        updatedItems = state.items.concat(action.item);
      }

      return {
        items: updatedItems,
        totalAmount: newAmount,
      };
    }
    case 'REMOVE_ITEM': {
      const existingItemsIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingItem = state.items[existingItemsIndex];
      const updatedAmount = state.totalAmount - existingItem.price;
      let updatedItems;
      if (existingItem.amount === 1) {
        // in this case, the item is removed altogether
        updatedItems = state.items.filter((item) => item.id !== action.id);
      } else {
        // or else, its amount is decreased by 1
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemsIndex] = updatedItem;
      }
      return {
        items: updatedItems,
        totalAmount: updatedAmount,
      };
    }
    case 'CLEAR': {
      return defaultState;
    }
    default:
      return defaultState;
  }
};

const CartProvider = ({ children }) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultState);

  const addItemToCartHandler = (item) => {
    dispatchCart({ type: 'ADD_ITEM', item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCart({ type: 'REMOVE_ITEM', id: id });
  };

  const clearCartHandler = () => {
    dispatchCart({ type: 'CLEAR' });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
