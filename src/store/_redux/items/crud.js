import axios from "axios";
import { apiUrl } from "../../../data/data";

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
