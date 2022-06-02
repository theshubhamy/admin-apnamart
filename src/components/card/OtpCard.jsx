import React, { useState } from "react";
import { toast } from "react-toastify";
const OtpCard = (props) => {
  const [otp, setOtp] = useState("");
  const formHandler = (e) => {
    e.preventDefault();
    if (otp !== "") {
      props.onOtpVerification(otp);
    } else {
      toast.warn("Please enter valid Otp.");
    }
    setOtp("");
  };
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 shadow-lg bg-gray-50 rounded-lg px-4 py-8">
        <div>
          <h2 className=" text-center text-3xl my-4 font-bold text-indigo-600">
            Verify it's you!
          </h2>

          <p className="mt-2 text-start text-base text-gray-700">
            An email with your verification code has been sent to{" "}
            <span className="text-indigo-600">{props.email}</span>.
          </p>
        </div>
        <form className="mt-4 space-y-4" onSubmit={formHandler}>
          <div className="rounded-md shadow-sm ">
            <input
              id="otp"
              name="otp"
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="relative  rounded block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Enter 6-digit code"
            />
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-xl font-semibold rounded-md text-white bg-indigo-400 hover:bg-indigo-500 focus:bg-indigo-500 hover:text-black "
          >
            Verify Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpCard;
