import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";
import store, { persistor } from "./store/Store";
import { Provider } from "react-redux";
import * as _redux from "./store/index";
import { useState } from "react";
_redux.setupAxios(axios, store);

function App() {
  const [value, setValue] = useState("");
  return (
    <Provider store={store}>
      <PersistGate loading={"Loading"} persistor={persistor}>
        <BrowserRouter className="App">
          <Navbar value={value} setValue={setValue} />
          <Routes>
            <Route path="/" exact element={<HomePage value={value} />} />
            <Route path="/productDetail/:id" element={<ProductDetail />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
