import React from "react";

const TotalFrame = ({ total }) => {
  return (
    <div>
      <span className="text-secondary text-[12px]">Checkout</span>
      <div className="bg-white w-[220px] flex flex-col gap-[15px] p-4 text-sm shadow-xl">
        <div className="flex gap-2">
          <p>Total Price</p>
          <span>{total}₺</span>
        </div>
        <a className="bg-primary flex justify-center p-2 text-white rounded-[4px]">
          Checkout
        </a>
      </div>
    </div>
  );
};

export default TotalFrame;
