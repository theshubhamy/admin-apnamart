import React, { lazy, useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./routes/ProtectedRoute";
import Sidebar from "./components/Sidebar";
//pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const User = lazy(() => import("./pages/Users"));
const Product = lazy(() => import("./pages/Product"));
const Categories = lazy(() => import("./pages/Categories"));
const Brand = lazy(() => import("./pages/Brand"));
const Order = lazy(() => import("./pages/Order"));
//auth
const Signin = lazy(() => import("./auth/Signin"));

const Signup = lazy(() => import("./auth/Signup"));
const SignupOtpVerification = lazy(() =>
  import("./auth/SignupOtpVerification")
);
const NotFound = lazy(() => import("./pages/NotFound"));
const App = () => {
  const { pathname } = useLocation();
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  //disable right click
  window.addEventListener("contextmenu", (e) => e.preventDefault());
  window.addEventListener("keydown", (e) => {
    if (e.key === "F12") e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.key === "I") e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.key === "J") e.preventDefault();
  });
  return (
    <React.StrictMode>
      {userInfo !== null && <Sidebar />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navigate to="/dashboard" replace="true" />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              {" "}
              <User />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              {" "}
              <Product />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              {" "}
              <Categories />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              {" "}
              <Order />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/brands"
          element={
            <ProtectedRoute>
              {" "}
              <Brand />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <NotFound />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/auth/signin"
          element={userInfo == null && <Signin />}
        ></Route>
        <Route
          path="/auth/signup"
          element={userInfo == null && <Signup />}
        ></Route>
        <Route
          path="/auth/signup/otp-verification/:email"
          element={userInfo == null && <SignupOtpVerification />}
        ></Route>
      </Routes>

      {/* tost */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </React.StrictMode>
  );
};

export default App;
