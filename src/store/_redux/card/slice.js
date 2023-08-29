import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

const initialState = {
  cardItems: [],
};
export const callTypes = {
  list: "list",
  action: "action",
};
//State işlemleri için
export const Slice = createSlice({
  name: "card",
  initialState: initialState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
        state.actionsLoading = false;
      } else {
        state.actionsLoading = false;
        state.listLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
        state.actionsLoading2 = true;
      }
    },
    increase: (state, action) => {
      state.error = null;
      const item = action.payload;
      let newItems = state.cardItems;
      const itemsIds = newItems?.map((obj) => obj.item.id);
      let index = -1;
      if (
        typeof itemsIds != "undefined" &&
        itemsIds != null &&
        itemsIds?.length != 0
      ) {
        index = itemsIds?.indexOf(item.id);
      }
      if (index == -1) {
        const newObj = {
          item: item,
          id: item.id,
          count: 1,
          price: item.numPrice,
        };
        newItems.push(newObj);
      } else {
        newItems[index].price =
          newItems[index].price + newItems[index].item.numPrice;
        newItems[index].count = newItems[index].count + 1;
      }
      state.cardItems = newItems;
    },
    decrease: (state, action) => {
      state.error = null;
      const item = action.payload;
      let newItems = state.cardItems;
      const itemsIds = newItems.map((obj) => obj.item.id);
      let index = itemsIds.indexOf(item.id);
      if (newItems[index].count != 1) {
        newItems[index].count = newItems[index].count - 1;
        newItems[index].price =
          newItems[index].price - newItems[index].item.numPrice;
      } else {
        newItems.splice(index, 1);
      }
      state.cardItems = newItems;
    },
    remove: (state, action) => {
      state.error = null;
      const item = action.payload;
      let newItems = state.cardItems;
      const itemsIds = newItems.map((obj) => obj.item.id);
      let index = itemsIds.indexOf(item.id);
      newItems = newItems.splice(index, 1);
      state.cardItems = newItems;
    },
  },
});
