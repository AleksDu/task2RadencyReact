import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "modern-normalize/modern-normalize.css";
import "./index.scss";
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
