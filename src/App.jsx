import React, { useContext, lazy, useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//contextProvider
import AuthContext from "./store/authContext";
import Sidebar from "./components/Sidebar";
//pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const User = lazy(() => import("./pages/Users"));
const Product = lazy(() => import("./pages/Product"));
const Categories = lazy(() => import("./pages/Categories"));
const Brand = lazy(() => import("./pages/Brand"));
//auth
const Signin = lazy(() => import("./auth/Signin"));
const SigninOtpVerification = lazy(() =>
  import("./auth/SigninOtpVerification")
);
const Signup = lazy(() => import("./auth/Signup"));
const SignupOtpVerification = lazy(() =>
  import("./auth/SignupOtpVerification")
);
const NotFound = lazy(() => import("./pages/NotFound"));
const App = () => {
  const { pathname } = useLocation();
  const authContext = useContext(AuthContext);
  const isSignedin = authContext.isLoggedIn;
  // always scroll to top on route/path change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  // disable right click
  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  // window.addEventListener("keydown", (e) => {
  //   if (e.key === "F12") e.preventDefault();
  //   if (e.ctrlKey && e.shiftKey && e.key === "I") e.preventDefault();
  //   if (e.ctrlKey && e.shiftKey && e.key === "J") e.preventDefault();
  // });
  return (
    <>
      {isSignedin && <Sidebar />}
      <Routes>
        <Route
          path="/"
          element={
            isSignedin ? (
              <Navigate to="/dashboard" replace="true" />
            ) : (
              <Navigate to="/auth/signin" replace="true" />
            )
          }
        ></Route>
        {isSignedin && (
          <>
            <Route
              path="/dashboard"
              element={
                isSignedin ? <Dashboard /> : <Navigate to="/" replace="true" />
              }
            />
            <Route
              path="/user-list"
              element={
                isSignedin ? <User /> : <Navigate to="/" replace="true" />
              }
            />
            <Route
              path="/products"
              element={
                isSignedin ? <Product /> : <Navigate to="/" replace="true" />
              }
            />
            <Route
              path="/categories"
              element={
                isSignedin ? <Categories /> : <Navigate to="/" replace="true" />
              }
            />
            <Route
              path="/brands"
              element={
                isSignedin ? <Brand /> : <Navigate to="/" replace="true" />
              }
            />
          </>
        )}
        <Route
          path="*"
          element={
            isSignedin ? (
              <NotFound />
            ) : (
              <Navigate to="/auth/signin" replace="true" />
            )
          }
        ></Route>

        <Route
          path="/auth/signin"
          element={
            !isSignedin ? <Signin /> : <Navigate to="/" replace="true" />
          }
        ></Route>
        <Route
          path="/auth/signin/otp-verification"
          element={
            !isSignedin ? (
              <SigninOtpVerification />
            ) : (
              <Navigate to="/" replace="true" />
            )
          }
        ></Route>
        <Route
          path="/auth/signup"
          element={
            !isSignedin ? <Signup /> : <Navigate to="/" replace="true" />
          }
        ></Route>
        <Route
          path="/auth/signup/otp-verification"
          element={
            !isSignedin ? (
              <SignupOtpVerification />
            ) : (
              <Navigate to="/" replace="true" />
            )
          }
        ></Route>
      </Routes>

      {/* tost */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </>
  );
};

export default App;
