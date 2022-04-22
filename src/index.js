import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "modern-normalize/modern-normalize.css";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";

const rootElement = document.getElementById("root");


rootElement.render(
  <Provider store={store}>
      <App />
  </Provider>
  
);
