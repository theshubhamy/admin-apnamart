import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apnaMart from "../api/apnaMart";
import UserContext from "../store/userContext";
import { toast } from "react-toastify";
const Signup = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");

  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await apnaMart.post(
        "/auth/administrator/signup",
        {
          name,
          email,
          phone,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 201) {
        toast(response.data.msg);
        navigate("../auth/signup/otp-verification", { replace: true });
        userContext.setEmail(email);
      } else {
        toast.warn(response.data.msg);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  return (
    <>
      <div className="min-h-screen px-6  flex items-center justify-center ">
        <div className="max-w-md w-full">
          <div>
            <h2 className="mt-6  text-center text-3xl font-bold text-gray-900">
              Create an Account
            </h2>
            <div className="mt-2 px-4 text-center text-sm text-gray-600">
              <span className="px-1 text-lg font-semibold">
                Already have an Account ?
              </span>
              <Link
                exact="true"
                to="/auth/Signin"
                className="font-semibold text-red-500 text-xl hover:text-indigo-500"
              >
                Sign in
              </Link>
            </div>
          </div>
          <form className=" space-y-6" onSubmit={signUpHandler}>
            <div className="rounded-md shadow-sm ">
              <div className="">
                <label htmlFor="name" className=" text-lg font-semibold">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  required
                  className="rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder=" Enter Name"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="email" className=" text-lg font-semibold">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                  className="relative  rounded block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email Address"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="phone" className=" text-lg font-semibold">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                  required
                  className="relative  rounded block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Phone Number"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="password" className="text-lg font-semibold">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  required
                  className="rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder=" Enter Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="ml-2 block text-sm text-gray-900">
                  by Sign up, you agree the{" "}
                  <Link
                    exact
                    className="hover:underline"
                    to="/termsandconditions"
                  >
                    Terms and Conditions.{" "}
                  </Link>
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-xl font-semibold rounded-md text-white bg-gray-600 hover:bg-indigo-400 hover:text-black "
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Signup;
