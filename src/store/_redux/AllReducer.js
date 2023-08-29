import { persistReducer, persistStore } from "redux-persist";
import { createStore } from "redux";
import storage from "redux-persist/lib/storage";
import * as items from "../_redux/items/slice";
import * as card from "../_redux/card/slice";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { reduxKey } from "../../data/staticDatas";

export const itemReducer = persistReducer(
  {
    transforms: [
      encryptTransform({
        secretKey: reduxKey,
        onError: function (error) {},
      }),
    ],
    storage,
    key: "items",
    blacklist: [],
  },
  items.Slice.reducer
);

const itemStore = createStore(itemReducer);
persistStore(itemStore);

export const cardReducer = persistReducer(
  {
    transforms: [
      encryptTransform({
        secretKey: reduxKey,
        onError: function (error) {},
      }),
    ],
    storage,
    key: "card",
    blacklist: [],
  },
  card.Slice.reducer
);

const cardStore = createStore(cardReducer);
persistStore(cardStore);
