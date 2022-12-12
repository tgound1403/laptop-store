import { createContext, useReducer } from 'react';

export const CartContext = createContext();

export const CartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return {
        cart: action.payload,
      };
    case 'CREATE_CART':
      return {
        cart: [action.payload, ...state.cart],
      };
    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, {
    cart: null,
  });

  console.log('CartContext state', state);
  return <CartContext.Provider value={{ ...state, dispatch }}>{children}</CartContext.Provider>;
};
