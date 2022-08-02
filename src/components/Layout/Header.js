import React from 'react'

import mealImage from "../../assets/meals.jpeg"
import classes from "./Header.module.css"
import HeaderCartButton from './HeaderCartButton'

const Header = (props) => {
  return (
    <React.Fragment>
        <header className={classes.header}>
            <h1>React Meals</h1>
            <HeaderCartButton onClick={props.onHandleOpenModal}/>
        </header>
        <div className={classes['main-image']}>
            <img src={mealImage} alt='A table full of delicious dishes.'/>
        </div>
    </React.Fragment>
  )
}

export default Header