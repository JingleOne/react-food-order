import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./components/Store/CartProvider";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  return (
    <CartProvider>
      {isModalOpen && <Cart onHandleOpenModal={handleOpenModal} />}
      <Header onHandleOpenModal={handleOpenModal} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
