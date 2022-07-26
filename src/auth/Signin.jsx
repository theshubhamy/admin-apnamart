import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login, clearErrors } from "../store/actions/userActions";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const { error, userInfo } = useSelector((state) => state.userLogin);

  let redirectPath = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (userInfo !== null) {
      navigate(redirectPath, { replace: true });
    }
  }, [dispatch, error, userInfo, redirectPath, navigate]);

  const SigninHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <>
      <div className="min-h-full flex items-center h-screen justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-6">
          <div className="Flex justify-center items-center">
            <h1 className="text-6xl text-center font-bold text-indigo-600">
              Apna Mart
            </h1>
            <h2 className="mt-4 text-center text-2xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className=" space-y-4 " onSubmit={SigninHandler}>
            <div className="rounded-md   space-y-2">
              <div>
                <label htmlFor="email-address" className="">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                  className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  required
                  autoComplete="off"
                  className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="font-light text-sm  ">
                  By continuing,&nbsp; you agree to Apna Mart's &nbsp;
                  <Link className="text-indigo-500" to="/">
                    Terms of Use
                  </Link>{" "}
                  and{" "}
                  <Link className="text-indigo-600" to="/">
                    Privacy Policy
                  </Link>
                  .
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
            <div className="flex items-center justify-between leading-6">
              <div className="text-base font-medium">
                <Link className="text-indigo-500" to="/auth/signup">
                  Create an Account
                </Link>{" "}
              </div>
              <div className="text-base font-medium">
                <Link className="text-indigo-600" to="/">
                  Forgot password ?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Signin;
