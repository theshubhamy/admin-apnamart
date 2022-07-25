import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/redux";
import ThemedSuspense from "./layout/ThemedSuspense";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Suspense fallback={<ThemedSuspense />}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </Suspense>
  </>
);
