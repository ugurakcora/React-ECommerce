import { itemListParser } from "../../../helper/itemParser";
import * as requestFromServer from "./crud";
import { Slice, callTypes } from "./slice";
const { actions } = Slice;
export const getProducts = () => (dispatch) => {
  try {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
      .getProducts()
      .then((response) => {
        if (response.status === 200) {
          const newData = itemListParser(response.data);
          dispatch(actions.setItems(newData));
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        return null;
      });
  } catch (error) {
    return null;
  }
};
