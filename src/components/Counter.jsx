import React, { useState } from "react";

const Counter = () => {
  // Хуки состояния (локальный state)
  const [likes, fSetLikes]= useState(0);

  /** Инкримент */
  function fIncrement() {
    fSetLikes(likes + 1);
  }

  /** Дикримент */
  function fDecrement() {
    fSetLikes(likes - 1);
  }

  return (
    <div>
      <h1>{likes}</h1>
      <button onClick={fIncrement}>Increment</button>
      <button onClick={fDecrement}>Decrement</button>
    </div>
  );
};

export default Counter;
