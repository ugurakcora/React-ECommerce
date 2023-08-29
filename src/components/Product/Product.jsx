import React from "react";

// Ürünlerin listelendiği kart bileşeni
const Product = ({ product, addToCard, productDetail }) => {
  return (
    <div
      key={product.id}
      className="bg-white flex flex-col gap-[15px] p-[10px] justify-between cursor-pointer"
    >
      <div
        className="flex flex-col gap-6"
        onClick={() => productDetail(product)}
      >
        <img src={product.image} alt="" />
        <span className="text-sm font-medium text-primary">
          {product.price}
        </span>
      </div>
      <div className="flex flex-col gap-6">
        <p
          onClick={() => productDetail(product)}
          className="text-sm font-medium "
        >
          {product.name}
        </p>
        <a
          className="flex bg-primary text-white justify-center py-2 text-[16px] rounded-[4px]"
          onClick={() => addToCard(product)}
        >
          Add to Cart
        </a>
      </div>
    </div>
  );
};

export default Product;
