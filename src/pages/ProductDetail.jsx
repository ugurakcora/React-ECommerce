import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as CardSlice from "../store/_redux/card/slice";
const ProductDetail = () => {
  const location = useLocation();
  const products = useSelector((state) => state.items.items);
  const dispatch = useDispatch();
  const cardSlice = CardSlice.Slice;
  const navigation = useNavigate();

  // Eğer bir ürünün detayına direkt gidilirse, ürünün id'sine göre ürünü bulup döndürüyor.
  const getItem = () => {
    const id = window.location.pathname.split("/").slice(-1);
    return products.filter((obj) => obj.id == id)[0];
  };

  const item =
    location?.state?.product != null ? location.state.product : getItem();

  // Redux Store'a bir ürün eklemek için kullanılan fonksiyon, navigation ile bir önce ki sayfaya geri dönüyor.
  const addToCard = (product) => {
    dispatch(cardSlice.actions.increase(product));
    navigation(-1);
  };
  return (
    <div className=" bg-primary-bg lg:px-32 py-[26px] h-screen">
      <div className="bg-white grid lg:grid-cols-2 p-2 gap-[30px]">
        <img className="w-full" src={item?.image} alt="" />
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-5">
            <h1 className="text-2xl">{item?.name}</h1>
            <span className="text-primary text-2xl">{item?.price}</span>
          </div>
          <div className="flex flex-col gap-5">
            <a
              onClick={() => addToCard(item)}
              className="flex bg-primary text-white justify-center py-2 text-[16px] rounded-[4px]"
            >
              Add to Cart
            </a>
            <p>{item?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
