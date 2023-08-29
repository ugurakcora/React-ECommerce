import React, { useState, useEffect } from "react";
import SidebarFilter from "../components/SidebarFilter";
import Cart from "../components/Cart/Cart";
import { useSelector, useDispatch } from "react-redux";
import * as itemActions from "../store/_redux/items/action";
import * as CardSlice from "../store/_redux/card/slice";
import { useNavigate } from "react-router-dom";
import Product from "../components/Product/Product";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function HomePage({ value }) {
  const [animationParent] = useAutoAnimate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.items.items);
  const cardSlice = CardSlice.Slice;
  const navigate = useNavigate();
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [items, setItems] = useState(products);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Ürünün detayına gitmek için
  const productDetail = (product) => {
    navigate(`/productDetail/${product.id}`, { state: { product: product } });
  };

  // Ürünleri filtrelemek için
  const [sort, setSort] = useState("oldToNew");
  const sortedProducts = items
    .filter((obj) => obj.name.toLowerCase().includes(value.toLowerCase()))
    .sort((a, b) => {
      if (sort === "newToOld") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sort === "oldToNew") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sort === "highToLow") {
        return b.price - a.price;
      } else if (sort === "lowToHigh") {
        return a.price - b.price;
      }
      return 0;
    });

  // Pagination Prev
  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  // Pagination Next
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  // Sepete ürün eklemek için
  const addToCard = (product) => {
    dispatch(cardSlice.actions.increase(product));
  };

  useEffect(() => {
    dispatch(itemActions.getProducts());
  }, []);

  return (
    <div className="bg-primary-bg px-8 md:px-32 py-[26px] gap-[35px] min-h-screen lg:flex">
      <SidebarFilter
        data-testid="sidebar-filter"
        products={products}
        items={items}
        setItems={setItems}
        sort={sort}
        setSort={setSort}
      />
      <div>
        <div
          data-testid="product-list"
          ref={animationParent}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {sortedProducts.length === 0 ? (
            <p className="text-center text-red-500 uppercase">
              ÜRÜN BULUNAMADI.
            </p>
          ) : (
            sortedProducts
              .slice(startIndex, endIndex)
              .map((product, i) => (
                <Product
                  key={product.id}
                  product={product}
                  addToCard={addToCard}
                  productDetail={productDetail}
                />
              ))
          )}
        </div>
        <div className="pagination flex justify-center text-secondary gap-3 mt-4">
          {totalPages > 0 && (
            <button
              className="pagination-button"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          )}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              data-testid="pagination-button"
              key={index}
              className={`pagination-button  ${
                currentPage === index + 1
                  ? "active bg-white text-primary px-2 rounded-[6px]"
                  : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          {totalPages > 0 && (
            <button
              className="pagination-button"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          )}
        </div>
      </div>
      <Cart data-testid="cart" />
    </div>
  );
}

export default HomePage;
