import React, { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../Store/cart-context";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = props.price.toFixed(2);

  const handleAddToCart = (itemAmount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      price: price,
      amount: itemAmount,
    });
  };

  return (
    <li className={classes.meal}>
      <div className={classes.mealItem}>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddCart={handleAddToCart} />
      </div>
    </li>
  );
};

export default MealItem;
