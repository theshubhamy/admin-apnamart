import React, { useContext, lazy } from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//contextProvider
import AuthContext from "./store/authContext";
import Sidebar from "./components/Sidebar";
//pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
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
  const authContext = useContext(AuthContext);
  const isSignedin = authContext.isLoggedIn;
  return (
    <BrowserRouter>
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
          <Route
            path="/dashboard"
            element={
              isSignedin ? <Dashboard /> : <Navigate to="/" replace="true" />
            }
          ></Route>
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
    </BrowserRouter>
  );
};

export default App;
