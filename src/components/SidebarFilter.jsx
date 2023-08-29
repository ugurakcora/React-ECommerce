import React, { useState } from "react";
import { allModels, baseBrands } from "../data/staticDatas";
import { arrayControl } from "../helper/arrayControl";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const SidebarFilter = ({ sort, setSort, products, items, setItems }) => {
  const [brands, setBrands] = useState(baseBrands);
  const [models, setModels] = useState([]);
  const [autoanimate] = useAutoAnimate();
  const setNewItems = () => {
    setItems((prev) => {
      let next = [...prev];
      const selectedBrands = brands
        .filter((obj) => obj.checked)
        .map((obj) => obj.txt);
      const selectedsModels = models
        .filter((obj) => obj.checked)
        .map((obj) => obj.txt);
      if (arrayControl(selectedBrands) && !arrayControl(selectedsModels)) {
        next = products.filter((obj) => selectedBrands.includes(obj.brand));
        return next;
      } else if (
        !arrayControl(selectedBrands) &&
        arrayControl(selectedsModels)
      ) {
        next = products.filter((obj) => selectedsModels.includes(obj.model));
        return next;
      } else if (
        arrayControl(selectedBrands) &&
        arrayControl(selectedsModels)
      ) {
        next = products.filter(
          (obj) =>
            selectedBrands.includes(obj.brand) &&
            selectedsModels.includes(obj.model)
        );
        return next;
      } else {
        return products;
      }
    });
  };
  const handleSortChange = (event) => {
    setSort(event.target.value);
  };
  const brandFilter = (txt) => {
    if (txt != null && txt != "") {
      setBrands(() => {
        return baseBrands.filter((obj) =>
          obj.txt.toLowerCase().includes(txt.toLowerCase())
        );
      });
      return;
    }
    setBrands(() => {
      return baseBrands;
    });
  };
  const checkedChange = (set, i) => {
    let next = [...brands];
    next[i].checked = !next[i].checked;
    if (next[i].checked) {
      const newItems = allModels.filter((obj) => obj.parentId == next[i].id);
      let newArr = [...models, ...newItems];
      setModels(() => {
        return newArr;
      });
    } else {
      const newItems = models.filter((obj) => obj.parentId != next[i].id);
      let newArr = [...newItems];
      setModels(() => {
        return newArr;
      });
    }
    set(() => {
      return next;
    });
    setNewItems();
  };
  const modelSelect = (value, i) => {
    let next = [...models];
    next[i].checked = !next[i].checked;
    setModels(() => {
      return next;
    });
    setNewItems();
  };
  const modelFilter = (txt) => {
    if (txt != null && txt != "") {
      setModels(() => {
        const selectedBrands = brands
          .filter((obj) => obj.checked)
          .map((obj) => obj.id);
        return allModels.filter(
          (obj) =>
            selectedBrands.includes(obj.parentId) &&
            obj.txt.toLowerCase().includes(txt.toLowerCase())
        );
      });
      return;
    }
    setModels(() => {
      const selectedBrandsIdies = brands
        .filter((obj) => obj.checked)
        .map((obj) => obj.id);
      return allModels.filter((obj) =>
        selectedBrandsIdies.includes(obj.parentId)
      );
    });
  };
  return (
    <div className="flex lg:flex-col gap-5 overflow-x-auto lg:overflow-visible mb-10 lg:justify-start">
      <div>
        <span className="text-secondary text-[12px]">Sort by</span>
        <div className="bg-white w-[220px] flex h-[158px] overflow-y-scroll flex-col gap-[15px] p-4 text-sm shadow-xl">
          <label className="flex gap-2">
            <input
              data-testid="sort-radio"
              type="radio"
              value="oldToNew"
              checked={sort === "oldToNew"}
              onChange={handleSortChange}
            />
            <p>Old to new</p>
          </label>
          <label className="flex gap-2">
            <input
              data-testid="sort-radio"
              type="radio"
              value="newToOld"
              checked={sort === "newToOld"}
              onChange={handleSortChange}
            />
            <p>New to old</p>
          </label>
          <label className="flex gap-2">
            <input
              data-testid="sort-radio"
              type="radio"
              value="highToLow"
              checked={sort === "highToLow"}
              onChange={handleSortChange}
            />
            <p>Price high to low</p>
          </label>
          <label className="flex gap-2">
            <input
              data-testid="sort-radio"
              type="radio"
              value="lowToHigh"
              checked={sort === "lowToHigh"}
              onChange={handleSortChange}
            />
            <p>Price low to high</p>
          </label>
        </div>
      </div>
      <div>
        <span className="text-secondary text-[12px]">Brands</span>
        <div className="bg-white w-[220px] flex flex-col gap-[15px] p-4 text-sm  h-[158px] overflow-y-scroll shadow-xl">
          <div className="flex ">
            <input
              type="text"
              onChange={(e) => brandFilter(e.target.value)}
              placeholder="Search"
              className="bg-primary-bg p-2"
            />
          </div>
          {brands.map((item, i) => {
            return (
              <div key={i} className="flex gap-2">
                <input
                  data-testid="brand-checkbox"
                  type="checkbox"
                  onChange={() => checkedChange(setBrands, i)}
                  checked={item.checked}
                />
                <p>{item.txt}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <span className="text-secondary text-[12px]">Model</span>
        <div
          ref={autoanimate}
          className="bg-white w-[220px] flex flex-col gap-[15px] p-4 text-sm"
        >
          <div className="flex ">
            <input
              data-testid="brand-checkbox"
              onChange={(e) => modelFilter(e.target.value)}
              type="text"
              placeholder="Search"
              className="bg-primary-bg p-2"
            />
          </div>
          {models.length > 0 ? (
            models.map((item, i) => {
              return (
                <div className="flex gap-2">
                  <input
                    data-testid="model-checkbox"
                    checked={item.checked}
                    onChange={(e) => modelSelect(e.target.value, i)}
                    type="checkbox"
                  />
                  <p>{item.txt}</p>
                </div>
              );
            })
          ) : (
            <div className="text-secondary">
              You haven't selected brands yet!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarFilter;
