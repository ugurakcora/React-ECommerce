import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

const initialState = {
  items: [],
};
export const callTypes = {
  list: "list",
  action: "action",
};
//State işlemleri için
export const Slice = createSlice({
  name: "items",
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
    setItems: (state, action) => {
      state.error = null;
      state.items = action.payload;
    },
  },
});
