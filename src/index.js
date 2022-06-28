import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
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
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Suspense>
      </UserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

reportWebVitals();

// //  <TextField
//           className="search-desktop"
//           size="small"
//           onChange={(e) => {
//             debounceSearch(e.target.value, debounceTimeout);
//           }}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <Search color="primary" />
//               </InputAdornment>
//             ),
//           }}
//           placeholder="Search for items/categories"
//           name="search"
//         />
//
