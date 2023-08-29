import axios from "axios";
import { apiUrl } from "../../../data/staticDatas";

export function getProducts(data) {
  var config = {
    method: "get",
    url: `${apiUrl}/products`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
}
