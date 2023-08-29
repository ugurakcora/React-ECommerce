export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    (config) => {
      return config;
    },
    (err) => Promise.reject(err)
  );
}
