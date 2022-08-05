import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const CART_REDUCER_ACTION = {
  ADD: "ADD",
  REMOVE: "REMOVE",
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_REDUCER_ACTION.ADD:
      const updatedItems = state.items.concat(action.payload);
      const updatedTotalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    case CART_REDUCER_ACTION.REMOVE:
      return;
    default:
      return defaultCartState;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: CART_REDUCER_ACTION.ADD, payload: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: CART_REDUCER_ACTION.REMOVE, payload: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
