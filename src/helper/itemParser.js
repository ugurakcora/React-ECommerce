import { fakeDatas } from "../data/data";

// Gelen verileri düzenler.
export const itemParser = (data) => {
  return {
    ...data,
    numPrice: parseFloat(data.price),
  };
};

export const itemListParser = (arr) => {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(itemParser(arr[i]));
  }
  return [...newArr, ...fakeDatas];
};
