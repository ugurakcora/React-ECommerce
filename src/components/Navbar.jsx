import React from "react";
import useTotalPrice from "../hooks/useTotalPrice";

const Navbar = (props) => {
  const total = useTotalPrice();
  return (
    <div className="bg-primary text-white flex flex-col justify-center items-center lg:flex-row lg:justify-between px-32 py-4 gap-4">
      <div className="flex flex-col lg:flex-row items-center gap-x-36 gap-y-4">
        <a href="/" className="text-2xl font-bold">
          Eteration
        </a>
        <input
          onChange={(e) => props.setValue(e.target.value)}
          value={props.value}
          type="text"
          name=""
          id=""
          placeholder="Search"
          className="w-[250px] py-1 px-3 text-black"
        />
      </div>
      <div className="flex gap-8">
        <p className="flex items-center gap-2">
          <ion-icon name="cart-outline"></ion-icon>
          {total}₺
        </p>
        <p className="flex items-center gap-2">
          <ion-icon name="person-outline"></ion-icon>
          Uğur Akçora
        </p>
      </div>
    </div>
  );
};

export default Navbar;
