import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function () {
  // Sepete eklenen ürünlerin toplam fiyatını hesaplayan hook
  const [total, setTotal] = useState(0);
  const cardItems = useSelector((state) => state.card.cardItems);
  useEffect(() => {
    setTotal(() => {
      return cardItems?.reduce((sum, item) => {
        return sum + item.price;
      }, 0);
    });
  }, [cardItems]);
  return total;
}
