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
    case CART_REDUCER_ACTION.ADD: {
      // console.log(`current add payload ${JSON.stringify(action.payload)}`);
      // console.log(`current cart items ${JSON.stringify(state.items)}`);

      const updatedItems = [];
      if (state.items.length === 0) {
        updatedItems.push(action.payload);
      } else {
        let found = false;
        for (let i = 0; i < state.items.length; i++) {
          if (state.items[i].id === action.payload.id) {
            updatedItems.push({
              ...action.payload,
              amount: state.items[i].amount + action.payload.amount,
            });
            found = true;
          } else {
            updatedItems.push({ ...state.items[i] });
          }
        }
        if (!found) {
          updatedItems.push({ ...action.payload });
        }
      }
      // console.log(`Updated items: ${JSON.stringify(updatedItems)}`);
      const updatedTotalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
    case CART_REDUCER_ACTION.REMOVE: {
      const remove_item_id = action.payload;
      const matchedItemIndex = state.items.findIndex(
        (item) => item.id === remove_item_id
      );
      console.log(action.payload);
      console.log(`current cart items ${JSON.stringify(state.items)}`);
      console.log(`current matched item ${matchedItemIndex}`);
      const matchedItem = state.items[matchedItemIndex];
      if (!matchedItem) {
        throw new Error("Item to delete does not exist");
      }
      const updatedTotalAmount = state.totalAmount - matchedItem.price;
      let updatedItems;
      const updatedItemAmount = state.items[matchedItemIndex].amount-1;
      if (updatedItemAmount <= 0){
        updatedItems = state.items.filter(item => item.id !== remove_item_id);
      }else{
        updatedItems = [...state.items];
        updatedItems[matchedItemIndex] = {...updatedItems[matchedItemIndex], amount: updatedItemAmount}
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
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
