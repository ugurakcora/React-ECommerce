import React from "react";

const CartLine = ({ item, increment, decrement }) => {
  return (
    <div className="flex gap-2 justify-between">
      <div>
        <p>{item.item.name}</p>
        <span className="text-primary">{item.price}₺</span>
      </div>
      <div className="flex items-center">
        <button
          className="bg-primary-bg w-6 h-6 flex justify-center items-center"
          onClick={() => decrement(item.item)}
        >
          -
        </button>
        <p className="bg-primary p-1 w-6 h-6 flex text-white justify-center items-center">
          {item.count}
        </p>
        <button
          className="bg-primary-bg w-6 h-6 flex justify-center items-center"
          onClick={() => increment(item.item)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartLine;
