import React, { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../Store/cart-context";

const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext);
  const [isItemAdded, setIsItemAdded] = useState(false);
  const numberOfCartItems = ctx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${isItemAdded ? classes.bump : ""}`;
  useEffect(() => {
    if (ctx.items.length === 0) {
      return;
    }
    setIsItemAdded(true);
    const timer = setTimeout(() => {
      setIsItemAdded(false);
    }, 300);
    return () => {
      console.log("useEffect return", timer);
      clearTimeout(timer);
    };
  }, [ctx.items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
