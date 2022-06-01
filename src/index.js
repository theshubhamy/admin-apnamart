import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/authContext";
import { UserContextProvider } from "./store/userContext";
import ThemedSuspense from "./layout/ThemedSuspense";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <Suspense fallback={<ThemedSuspense />}>
          <App />
        </Suspense>
      </UserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

reportWebVitals();
