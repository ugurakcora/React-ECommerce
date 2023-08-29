import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartLine from "./CartLine";
import * as CardSlice from "../../store/_redux/card/slice";
import TotalFrame from "./TotalFrame";
import useTotalPrice from "../../hooks/useTotalPrice";
const Cart = () => {
  const dispatch = useDispatch();
  const cardSlice = CardSlice.Slice;
  const cardItems = useSelector((state) => state.card.cardItems);
  const total = useTotalPrice();

  // Sepetten Ürün eklemek için
  const increment = (product) => {
    dispatch(cardSlice.actions.increase(product));
  };

  // Sepetten Ürün çıkarmak için
  const decrement = (product) => {
    dispatch(cardSlice.actions.decrease(product));
  };

  return (
    <div className="flex items-center justify-center lg:justify-start flex-col gap-5">
      <div>
        <span className="text-secondary text-[12px]">Cart</span>
        <div className="bg-white w-[220px] flex flex-col gap-[15px] p-4 text-sm shadow-xl">
          {cardItems.length > 0 ? (
            cardItems.map((item, i) => (
              <CartLine
                key={i}
                item={item}
                increment={(e) => increment(e)}
                decrement={(e) => decrement(e)}
              />
            ))
          ) : (
            <div className="text-secondary">
              There are no items in your cart yet!
            </div>
          )}
        </div>
      </div>
      <TotalFrame total={total} />
    </div>
  );
};

export default Cart;
